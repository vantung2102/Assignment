package com.example.hrm.Response;


import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class OnboardingByStaffAttributes {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("onboarding_sample_step")
    @Expose
    private OnboardingSampleStep onboardingSampleStep;
    @SerializedName("staff_onboarding")
    @Expose
    private StaffOnboarding staffOnboarding;
    @SerializedName("assigned_person")
    @Expose
    private Object assignedPerson;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("start_date")
    @Expose
    private Object startDate;
    @SerializedName("due_date")
    @Expose
    private Object dueDate;
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

    public OnboardingSampleStep getOnboardingSampleStep() {
        return onboardingSampleStep;
    }

    public void setOnboardingSampleStep(OnboardingSampleStep onboardingSampleStep) {
        this.onboardingSampleStep = onboardingSampleStep;
    }

    public StaffOnboarding getStaffOnboarding() {
        return staffOnboarding;
    }

    public void setStaffOnboarding(StaffOnboarding staffOnboarding) {
        this.staffOnboarding = staffOnboarding;
    }

    public Object getAssignedPerson() {
        return assignedPerson;
    }

    public void setAssignedPerson(Object assignedPerson) {
        this.assignedPerson = assignedPerson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getStartDate() {
        return startDate;
    }

    public void setStartDate(Object startDate) {
        this.startDate = startDate;
    }

    public Object getDueDate() {
        return dueDate;
    }

    public void setDueDate(Object dueDate) {
        this.dueDate = dueDate;
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





