package com.example.hrm.Response;

import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class LeaveApplicationAttributes {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("leave_type")
    @Expose
    private String leaveType;
    @SerializedName("start_day")
    @Expose
    private String startDay;
    @SerializedName("end_day")
    @Expose
    private String endDay;
    @SerializedName("number_of_days_off")
    @Expose
    private Double numberOfDaysOff;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("staff")
    @Expose
    private StaffAttributes staff;
    @SerializedName("approver")
    @Expose
    private Staff approver;
    @SerializedName("description")
    @Expose
    private String description;
    @SerializedName("created_at")
    @Expose
    private String createdAt;
    @SerializedName("updated_at")
    @Expose
    private String updatedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    public String getStartDay() {
        return startDay;
    }

    public void setStartDay(String startDay) {
        this.startDay = startDay;
    }

    public String getEndDay() {
        return endDay;
    }

    public void setEndDay(String endDay) {
        this.endDay = endDay;
    }

    public Double getNumberOfDaysOff() {
        return numberOfDaysOff;
    }

    public void setNumberOfDaysOff(Double numberOfDaysOff) {
        this.numberOfDaysOff = numberOfDaysOff;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public StaffAttributes getStaff() {
        return staff;
    }

    public void setStaff(StaffAttributes staff) {
        this.staff = staff;
    }

    public Staff getApprover() {
        return approver;
    }

    public void setApprover(Staff approver) {
        this.approver = approver;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

}
