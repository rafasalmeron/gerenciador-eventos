package br.com.api.gerenciador_eventos.controller;

import br.com.api.gerenciador_eventos.dto.LoginRequest;
import br.com.api.gerenciador_eventos.model.Admin;
import br.com.api.gerenciador_eventos.security.JwtUtil;
import br.com.api.gerenciador_eventos.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        try {
            List<Admin> admins = adminService.getAllAdmins();
            return ResponseEntity.ok(admins);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        try {
            adminService.registerAdmin(admin);
            return ResponseEntity.ok("Administrador cadastrado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            Admin admin = adminService.authenticateAdmin(loginRequest.getEmail(), loginRequest.getSenha());
            String token = JwtUtil.generateToken(admin.getEmail(), admin.getId());
            return ResponseEntity.ok(token);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/admins/{email}")
    public ResponseEntity<Admin> getAdminByEmail(@PathVariable String email) {
        try {
            Admin admin = adminService.findUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Administrador não encontrado!"));
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}