package com.fivejoys.employee;

import com.fivejoys.employee.dto.EmployeeCreateRequest;
import com.fivejoys.employee.dto.EmployeeResponse;
import com.fivejoys.employee.dto.EmployeeUpdateRequest;
import com.fivejoys.employee.dto.SensitiveEmployeeResponse;
import org.springframework.stereotype.Service;

import com.fivejoys.user.UserService;
import org.springframework.transaction.annotation.Transactional;

import com.fivejoys.leave.balance.LeaveBalance;
import com.fivejoys.leave.balance.LeaveBalanceRepository;

import com.fivejoys.leave.request.LeaveRequestRepository;
import com.fivejoys.user.UserRepository;


import java.math.BigDecimal;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    public EmployeeService(
            EmployeeRepository employeeRepository,
            UserService userService,
            UserRepository userRepository,
            LeaveRequestRepository leaveRequestRepository,
            LeaveBalanceRepository leaveBalanceRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
    }

    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EmployeeResponse getEmployeeByNumber(String employeeNumber) {
        Employee employee = employeeRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found: " + employeeNumber)
                );

        return toResponse(employee);
    }

    @Transactional
    public EmployeeResponse createEmployee(EmployeeCreateRequest request) {

        if (employeeRepository.existsById(request.getEmployeeNumber())) {
            throw new RuntimeException(
                    "Employee already exists: "
                            + request.getEmployeeNumber()
            );
        }

        Employee employee = getEmployee(request);

        Employee savedEmployee =
                employeeRepository.save(employee);

        userService.createUser(
                savedEmployee.getEmployeeNumber(),
                "1234"
        );

        LeaveBalance leaveBalance = getLeaveBalance(savedEmployee);

        leaveBalanceRepository.save(leaveBalance);

        return toResponse(savedEmployee);
    }

    private LeaveBalance getLeaveBalance(Employee savedEmployee) {
        LeaveBalance leaveBalance = new LeaveBalance();

        leaveBalance.setEmployeeNumber(
                savedEmployee.getEmployeeNumber()
        );

        leaveBalance.setVacationCredit(BigDecimal.ZERO);
        leaveBalance.setVacationUsed(BigDecimal.ZERO);

        leaveBalance.setSickCredit(BigDecimal.ZERO);
        leaveBalance.setSickUsed(BigDecimal.ZERO);

        leaveBalance.setSoloParentCredit(BigDecimal.ZERO);
        leaveBalance.setSoloParentUsed(BigDecimal.ZERO);

        leaveBalance.setMaternalPaternalCredit(BigDecimal.ZERO);
        leaveBalance.setMaternalPaternalUsed(BigDecimal.ZERO);
        return leaveBalance;
    }

    private Employee getEmployee(EmployeeCreateRequest request) {
        Employee employee = new Employee();

        employee.setEmployeeNumber(request.getEmployeeNumber());
        employee.setEmployeeName(request.getEmployeeName());
        employee.setHiringDate(request.getHiringDate());
        employee.setAddress(request.getAddress());
        employee.setStoreAssignment(request.getStoreAssignment());
        employee.setBirthday(request.getBirthday());
        employee.setPosition(request.getPosition());
        employee.setManagerAppointmentDate(
                request.getManagerAppointmentDate()
        );
        employee.setRemarks(request.getEmploymentStatus());
        employee.setSex(request.getSex());
        return employee;
    }

    public EmployeeResponse updateEmployee(
            String employeeNumber,
            EmployeeUpdateRequest request
    ) {

        Employee employee = employeeRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found: " + employeeNumber)
                );

        employee.setEmployeeName(request.getEmployeeName());
        employee.setHiringDate(request.getHiringDate());
        employee.setAddress(request.getAddress());
        employee.setStoreAssignment(request.getStoreAssignment());
        employee.setBirthday(request.getBirthday());
        employee.setPosition(request.getPosition());
        employee.setManagerAppointmentDate(request.getManagerAppointmentDate());
        employee.setRemarks(request.getEmploymentStatus());
        employee.setSex(request.getSex());

        Employee updatedEmployee = employeeRepository.save(employee);

        return toResponse(updatedEmployee);
    }

    @Transactional
    public void deleteEmployee(String employeeNumber) {

        if (!employeeRepository.existsById(employeeNumber)) {
            throw new RuntimeException(
                    "Employee not found: " + employeeNumber
            );
        }

        leaveRequestRepository.deleteByEmployeeNumber(employeeNumber);
        leaveBalanceRepository.deleteById(employeeNumber);
        userRepository.deleteByEmployeeNumber(employeeNumber);
        employeeRepository.deleteById(employeeNumber);
    }

    private EmployeeResponse toResponse(Employee employee) {

        EmployeeResponse response = new EmployeeResponse();

        response.setEmployeeNumber(employee.getEmployeeNumber());
        response.setEmployeeName(employee.getEmployeeName());
        response.setHiringDate(employee.getHiringDate());
        response.setAddress(employee.getAddress());
        response.setStoreAssignment(employee.getStoreAssignment());
        response.setBirthday(employee.getBirthday());
        response.setPosition(employee.getPosition());
        response.setManagerAppointmentDate(
                employee.getManagerAppointmentDate()
        );
        response.setEmploymentStatus(employee.getRemarks());
        response.setSex(employee.getSex());

        return response;
    }

    public SensitiveEmployeeResponse getSensitiveEmployee(
            String employeeNumber
    ) {
        Employee employee = employeeRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found: " + employeeNumber
                        )
                );

        SensitiveEmployeeResponse response =
                new SensitiveEmployeeResponse();

        response.setEmployeeNumber(employee.getEmployeeNumber());
        response.setEmployeeName(employee.getEmployeeName());
        response.setSssNumber(employee.getSssNumber());
        response.setPagibigNumber(employee.getPagibigNumber());
        response.setPhilhealthNumber(employee.getPhilhealthNumber());
        response.setTinNumber(employee.getTinNumber());

        return response;
    }

    public SensitiveEmployeeResponse updateSensitiveEmployee(
            String employeeNumber,
            SensitiveEmployeeUpdateRequest request
    ) {
        Employee employee = employeeRepository.findById(employeeNumber)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Employee not found: " + employeeNumber
                        )
                );

        employee.setSssNumber(request.getSssNumber());
        employee.setPagibigNumber(request.getPagibigNumber());
        employee.setPhilhealthNumber(request.getPhilhealthNumber());
        employee.setTinNumber(request.getTinNumber());

        employeeRepository.save(employee);

        return getSensitiveEmployee(employeeNumber);
    }
}