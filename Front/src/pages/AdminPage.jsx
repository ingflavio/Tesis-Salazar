import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import classes from '../styles/admin.module.scss'

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
export default function AdminPage() { 
  const data = [
    {name: 'enero', activos: 30, inactivos: 10},
    {name: 'febrero', activos: 36, inactivos: 4},
    {name: 'marzo', activos: 24, inactivos: 16},
    {name: 'abril', activos: 28, inactivos: 12},
    {name: 'mayo', activos: 37, inactivos: 3},
  ]

  const lines = [
    {key: 'activos', color: '#ffab45'},
    {key: 'inactivos', color: '#aa66ff'}
  ]
  
  return (
    <main className={classes.adminPage}>
      <h3>Buenos dias [nombre]</h3>
      <div className={classes.dashboard}>
        <section>
          <h3>Usuarios</h3>
          <LinesGraphic data={data} lines={lines} xAxis={'name'} />
        </section>
      </div>
    </main>
  );
}
