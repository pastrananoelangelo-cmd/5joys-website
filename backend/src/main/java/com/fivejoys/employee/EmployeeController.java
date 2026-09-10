package com.fivejoys.employee;

import com.fivejoys.employee.dto.EmployeeCreateRequest;
import com.fivejoys.employee.dto.EmployeeResponse;
import com.fivejoys.employee.dto.EmployeeUpdateRequest;
import com.fivejoys.employee.dto.SensitiveEmployeeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<EmployeeResponse> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{employeeNumber}")
    public EmployeeResponse getEmployeeByNumber(
            @PathVariable String employeeNumber
    ) {
        return employeeService.getEmployeeByNumber(employeeNumber);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(
            @RequestBody EmployeeCreateRequest request
    ) {
        return employeeService.createEmployee(request);
    }

    @PutMapping("/{employeeNumber}")
    public EmployeeResponse updateEmployee(
            @PathVariable String employeeNumber,
            @RequestBody EmployeeUpdateRequest request
    ) {
        return employeeService.updateEmployee(
                employeeNumber,
                request
        );
    }

    @DeleteMapping("/{employeeNumber}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(
            @PathVariable String employeeNumber
    ) {
        employeeService.deleteEmployee(employeeNumber);
    }

    @GetMapping("/{employeeNumber}/sensitive")
    public SensitiveEmployeeResponse getSensitiveEmployee(
            @PathVariable String employeeNumber
    ) {
        return employeeService.getSensitiveEmployee(employeeNumber);
    }

    @PutMapping("/{employeeNumber}/sensitive")
    public SensitiveEmployeeResponse updateSensitiveEmployee(
            @PathVariable String employeeNumber,
            @RequestBody SensitiveEmployeeUpdateRequest request
    ) {
        return employeeService.updateSensitiveEmployee(
                employeeNumber,
                request
        );
    }
}