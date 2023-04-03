package com.example.hrm.Response;

import java.io.Serializable;
import java.util.List;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class StaffAttributes implements Serializable {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("fullname")
    @Expose
    private String fullname;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("phone")
    @Expose
    private String phone;
    @SerializedName("address")
    @Expose
    private String address;
    @SerializedName("join_date")
    @Expose
    private Object joinDate;
    @SerializedName("date_of_birth")
    @Expose
    private Object dateOfBirth;
    @SerializedName("gender")
    @Expose
    private String gender;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("position")
    @Expose
    private Position position;
    @SerializedName("department")
    @Expose
    private Department department;
    @SerializedName("job_title")
    @Expose
    private JobTitle jobTitle;
    @SerializedName("upper_level")
    @Expose
    private Staff upperLevel;
    @SerializedName("lower_levels")
    @Expose
    private List<Staff> lowerLevels;
    @SerializedName("roles")
    @Expose
    private List<RoleAttribute> roles;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Object getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Object joinDate) {
        this.joinDate = joinDate;
    }

    public Object getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Object dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public JobTitle getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(JobTitle jobTitle) {
        this.jobTitle = jobTitle;
    }

    public Staff getUpperLevel() {
        return upperLevel;
    }

    public void setUpperLevel(Staff upperLevel) {
        this.upperLevel = upperLevel;
    }

    public List<Staff> getLowerLevels() {
        return lowerLevels;
    }

    public void setLowerLevels(List<Staff> lowerLevels) {
        this.lowerLevels = lowerLevels;
    }

    public List<RoleAttribute> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleAttribute> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "StaffAttributes{" +
                "id=" + id +
                ", fullname='" + fullname + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", joinDate=" + joinDate +
                ", dateOfBirth=" + dateOfBirth +
                ", gender='" + gender + '\'' +
                ", status='" + status + '\'' +
                ", position=" + position +
                ", department=" + department +
                ", jobTitle=" + jobTitle +
                ", upperLevel=" + upperLevel +
                ", lowerLevels=" + lowerLevels +
                ", roles=" + roles +
                '}';
    }
}