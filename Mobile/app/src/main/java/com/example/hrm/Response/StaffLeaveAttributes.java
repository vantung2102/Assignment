package com.example.hrm.Response;
import javax.annotation.Generated;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
@Generated("jsonschema2pojo")
public class StaffLeaveAttributes {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("staff")
    @Expose
    private StaffAttributes staff;
    @SerializedName("casual_leave")
    @Expose
    private Double casualLeave;
    @SerializedName("marriage_leave")
    @Expose
    private Double marriageLeave;
    @SerializedName("compassionate_leave")
    @Expose
    private Double compassionateLeave;
    @SerializedName("paternity_leave")
    @Expose
    private Double paternityLeave;
    @SerializedName("maternity_leave")
    @Expose
    private Double maternityLeave;
    @SerializedName("unpaid_leave")
    @Expose
    private Double unpaidLeave;
    @SerializedName("allowed_number_of_days_off")
    @Expose
    private Double allowedNumberOfDaysOff;
    @SerializedName("description")
    @Expose
    private Object description;
    @SerializedName("created_at")
    @Expose
    private String createdAt;
    @SerializedName("updated_at")
    @Expose
    private String updatedAt;

    public StaffLeaveAttributes(StaffLeaveAttributes item) {
        this(item.getId(), item.getStaff(),item.casualLeave,item.marriageLeave,item.compassionateLeave,item.paternityLeave,item.maternityLeave,item.unpaidLeave,item.allowedNumberOfDaysOff,item.description,item.createdAt,item.updatedAt);
    }

    public StaffLeaveAttributes(Integer id, StaffAttributes staff, Double casualLeave, Double marriageLeave, Double compassionateLeave, Double paternityLeave, Double maternityLeave, Double unpaidLeave, Double allowedNumberOfDaysOff, Object description, String createdAt, String updatedAt) {
        this.id = id;
        this.staff = staff;
        this.casualLeave = casualLeave;
        this.marriageLeave = marriageLeave;
        this.compassionateLeave = compassionateLeave;
        this.paternityLeave = paternityLeave;
        this.maternityLeave = maternityLeave;
        this.unpaidLeave = unpaidLeave;
        this.allowedNumberOfDaysOff = allowedNumberOfDaysOff;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public StaffAttributes getStaff() {
        return staff;
    }

    public void setStaff(StaffAttributes staff) {
        this.staff = staff;
    }

    public Double getCasualLeave() {
        return casualLeave;
    }

    public void setCasualLeave(Double casualLeave) {
        this.casualLeave = casualLeave;
    }

    public Double getMarriageLeave() {
        return marriageLeave;
    }

    public void setMarriageLeave(Double marriageLeave) {
        this.marriageLeave = marriageLeave;
    }

    public Double getCompassionateLeave() {
        return compassionateLeave;
    }

    public void setCompassionateLeave(Double compassionateLeave) {
        this.compassionateLeave = compassionateLeave;
    }

    public Double getPaternityLeave() {
        return paternityLeave;
    }

    public void setPaternityLeave(Double paternityLeave) {
        this.paternityLeave = paternityLeave;
    }

    public Double getMaternityLeave() {
        return maternityLeave;
    }

    public void setMaternityLeave(Double maternityLeave) {
        this.maternityLeave = maternityLeave;
    }

    public Double getUnpaidLeave() {
        return unpaidLeave;
    }

    public void setUnpaidLeave(Double unpaidLeave) {
        this.unpaidLeave = unpaidLeave;
    }

    public Double getAllowedNumberOfDaysOff() {
        return allowedNumberOfDaysOff;
    }

    public void setAllowedNumberOfDaysOff(Double allowedNumberOfDaysOff) {
        this.allowedNumberOfDaysOff = allowedNumberOfDaysOff;
    }

    public Object getDescription() {
        return description;
    }

    public void setDescription(Object description) {
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

    @Override
    public String toString() {
        return "StaffLeaveAttributes{" +
                "id=" + id +
                ", staff=" + staff +
                ", casualLeave=" + casualLeave +
                ", marriageLeave=" + marriageLeave +
                ", compassionateLeave=" + compassionateLeave +
                ", paternityLeave=" + paternityLeave +
                ", maternityLeave=" + maternityLeave +
                ", unpaidLeave=" + unpaidLeave +
                ", allowedNumberOfDaysOff=" + allowedNumberOfDaysOff +
                ", description=" + description +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}
