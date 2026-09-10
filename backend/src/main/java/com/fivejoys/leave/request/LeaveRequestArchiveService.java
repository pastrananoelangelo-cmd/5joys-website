package com.fivejoys.leave.request;

import com.fivejoys.employee.Employee;
import com.fivejoys.employee.EmployeeRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import java.time.LocalDate;

@Service
public class LeaveRequestArchiveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;

    public LeaveRequestArchiveService(
            LeaveRequestRepository leaveRequestRepository,
            EmployeeRepository employeeRepository
    ) {
        this.leaveRequestRepository =
                leaveRequestRepository;

        this.employeeRepository =
                employeeRepository;
    }

    @Transactional
    public byte[] archiveCompletedLeaveRequests()
            throws IOException {

        List<String> statuses = List.of(
                "APPROVED",
                "REJECTED"
        );

        List<LeaveRequest> requests =
                leaveRequestRepository.findByStatusIn(
                        statuses
                );

        if (requests.isEmpty()) {
            throw new IllegalStateException(
                    "There are no completed leave records to archive."
            );
        }

        try (
                Workbook workbook =
                        new XSSFWorkbook();

                ByteArrayOutputStream output =
                        new ByteArrayOutputStream()
        ) {

            Sheet sheet =
                    workbook.createSheet(
                            "Leave Records"
                    );

            createHeader(sheet);

            int rowNumber = 1;

            for (LeaveRequest request : requests) {

                Employee employee =
                        employeeRepository
                                .findById(
                                        request.getEmployeeNumber()
                                )
                                .orElse(null);

                Row row =
                        sheet.createRow(rowNumber++);

                row.createCell(0)
                        .setCellValue(
                                request.getEmployeeNumber()
                        );

                row.createCell(1)
                        .setCellValue(
                                employee != null
                                        ? employee.getEmployeeName()
                                        : "Unknown"
                        );

                row.createCell(2)
                        .setCellValue(
                                request.getLeaveType()
                        );

                row.createCell(3)
                        .setCellValue(
                                request.getStartDate()
                                        .toString()
                        );

                row.createCell(4)
                        .setCellValue(
                                request.getEndDate()
                                        .toString()
                        );

                row.createCell(5)
                        .setCellValue(
                                request.getDays()
                                        .doubleValue()
                        );

                row.createCell(6)
                        .setCellValue(
                                request.getStatus()
                        );

                row.createCell(7)
                        .setCellValue(
                                request.getReason() != null
                                        ? request.getReason()
                                        : ""
                        );

                row.createCell(8)
                        .setCellValue(
                                request.getSubmittedOn()
                                        .toString()
                        );

                row.createCell(9)
                        .setCellValue(
                                request.getDecidedOn() != null
                                        ? request.getDecidedOn()
                                        .toString()
                                        : ""
                        );

                row.createCell(10)
                        .setCellValue(
                                request.getRejectionReason() != null
                                        ? request.getRejectionReason()
                                        : ""
                        );
            }

            for (int i = 0; i <= 10; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(output);

            byte[] excelFile =
                    output.toByteArray();

            /*
             * IMPORTANT:
             *
             * Delete only AFTER the Excel file
             * has been successfully generated.
             */
            leaveRequestRepository.deleteByStatusIn(
                    statuses
            );

            return excelFile;
        }
    }

    private void createHeader(
            Sheet sheet
    ) {

        Row header =
                sheet.createRow(0);

        String[] columns = {
                "Employee Number",
                "Employee Name",
                "Leave Type",
                "Start Date",
                "End Date",
                "Days",
                "Status",
                "Reason",
                "Submitted On",
                "Decided On",
                "Rejection Reason"
        };

        for (int i = 0; i < columns.length; i++) {

            header.createCell(i)
                    .setCellValue(
                            columns[i]
                    );
        }
    }
}