package com.fivejoys.employee.dto;

import java.time.LocalDate;

public class EmployeeCreateRequest {

    private String employeeNumber;
    private String employeeName;
    private LocalDate hiringDate;
    private String address;
    private String storeAssignment;
    private LocalDate birthday;
    private String position;
    private LocalDate managerAppointmentDate;
    private String employmentStatus;
    private String sex;

    public EmployeeCreateRequest() {
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public LocalDate getHiringDate() {
        return hiringDate;
    }

    public void setHiringDate(LocalDate hiringDate) {
        this.hiringDate = hiringDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStoreAssignment() {
        return storeAssignment;
    }

    public void setStoreAssignment(String storeAssignment) {
        this.storeAssignment = storeAssignment;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public LocalDate getManagerAppointmentDate() {
        return managerAppointmentDate;
    }

    public void setManagerAppointmentDate(LocalDate managerAppointmentDate) {
        this.managerAppointmentDate = managerAppointmentDate;
    }

    public String getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(String employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}