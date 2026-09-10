package com.fivejoys.employee;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @Column(name = "employee_number", length = 9)
    private String employeeNumber;

    @Column(name = "employee_name", length = 150)
    private String employeeName;

    @Column(name = "hiring_date")
    private LocalDate hiringDate;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "store_assignment", length = 100)
    private String storeAssignment;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "sss_number", length = 12)
    private String sssNumber;

    @Column(name = "pagibig_number", length = 15)
    private String pagibigNumber;

    @Column(name = "philhealth_number", length = 14)
    private String philhealthNumber;

    @Column(name = "tin_number", length = 11)
    private String tinNumber;

    @Column(name = "position", length = 50)
    private String position;

    @Column(name = "manager_appointment_date")
    private LocalDate managerAppointmentDate;

    @Column(name = "remarks", length = 20)
    private String remarks;

    @Column(name = "sex", length = 1)
    private String sex;

    public Employee() {
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

    public String getSssNumber() {
        return sssNumber;
    }

    public void setSssNumber(String sssNumber) {
        this.sssNumber = sssNumber;
    }

    public String getPagibigNumber() {
        return pagibigNumber;
    }

    public void setPagibigNumber(String pagibigNumber) {
        this.pagibigNumber = pagibigNumber;
    }

    public String getPhilhealthNumber() {
        return philhealthNumber;
    }

    public void setPhilhealthNumber(String philhealthNumber) {
        this.philhealthNumber = philhealthNumber;
    }

    public String getTinNumber() {
        return tinNumber;
    }

    public void setTinNumber(String tinNumber) {
        this.tinNumber = tinNumber;
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

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}