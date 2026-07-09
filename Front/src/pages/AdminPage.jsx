import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classes from '../styles/admin.module.scss'
import { useOutletContext } from 'react-router';

function LinesGraphic({ data, xAxis, lines=[] }) {
  return(
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
        <XAxis 
          dataKey={xAxis}
          height={40}
          />        
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        {
          lines.map((line) => <Line 
            key={line.key} 
            type="monotone" 
            dataKey={line.key} 
            stroke={line.color} 
            dot={false}
          />)
        }
      </LineChart>
    </ResponsiveContainer>
  )
}

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white"
      textAnchor="middle" 
      dominantBaseline="central"
      style={{
        fontSize: '14px',
        fontWeight: 'bold',
        textShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

// Tooltip personalizado
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          {payload[0].name || `Sección ${payload[0].payload.index + 1}`}
        </p>
        <p style={{ margin: 0, color: '#666' }}>
          {payload[0].value} usuarios ({payload[0].payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

function PieGraphic({ data }) {
  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Agregar índice y porcentaje a los datos
  const dataWithIndex = data.map((item, index) => ({
    ...item,
    index,
    percentage: ((item.value / total) * 100).toFixed(1),
    name: item.name || `Sección ${index + 1}` // Nombre por defecto si no viene
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={dataWithIndex}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {dataWithIndex.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, ) => {
            const item = dataWithIndex.find(d => d.name === value);
            return `${value} (${item?.percentage || 0}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function AdminPage() { 
  const {name} = useOutletContext()

  const data = [
    {name: 'enero', activos: 15, inactivos: 5, totales:20},
    {name: 'febrero', activos: 13, inactivos: 11, totales:24}, 
    {name: 'marzo', activos: 20, inactivos: 11, totales:31}, 
    {name: 'abril', activos: 27, inactivos: 8, totales:35}, 
    {name: 'mayo', activos: 26, inactivos: 14, totales:40}, 
  ]

  const lines = [
    {key: 'activos', color: '#ffab45'},
    {key: 'inactivos', color: '#aa66ff'},
    {key: 'totales', color: '#45c2ff'}
  ]

  const pieData = [
    {name:'activos', value: 26, color: "#ffab45"},
    {name:'inactivos', value: 14, color: "#aa66ff"}
  ]
  
  return (
    <main className={classes.adminPage}>
      <h3>Buenos dias {name}</h3>
      <div className={classes.dashboard}>
        <section>
          <h4>Usuarios</h4>
          <div className={classes.dobleGraphics}>
            <LinesGraphic data={data} lines={lines} xAxis={'name'} />
            <PieGraphic data={pieData} />
          </div>
        </section>
        {/* <section>
          <h4>Maquinas</h4>
          
        </section> */}
      </div>
    </main>
  );
}
