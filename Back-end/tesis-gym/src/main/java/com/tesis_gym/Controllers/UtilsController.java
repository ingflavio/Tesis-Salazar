package com.tesis_gym.Controllers;

import com.tesis_gym.Entities.Banks;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/utils")
public class UtilsController {

    @GetMapping("/banks")
    public ResponseEntity<Banks[]> getAllBanks() {
        return ResponseEntity.ok(Banks.values());
    }

}
