package com.example.hrm.Response;

import javax.annotation.Generated;
        import com.google.gson.annotations.Expose;
        import com.google.gson.annotations.SerializedName;

@Generated("jsonschema2pojo")
public class PropertyHistoryAttributes {

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("provider")
    @Expose
    private Staff provider;
    @SerializedName("receiver")
    @Expose
    private Staff receiver;
    @SerializedName("property")
    @Expose
    private PropertyAttributes property;
    @SerializedName("status")
    @Expose
    private String status;
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

    public Staff getProvider() {
        return provider;
    }

    public void setProvider(Staff provider) {
        this.provider = provider;
    }

    public Staff getReceiver() {
        return receiver;
    }

    public void setReceiver(Staff receiver) {
        this.receiver = receiver;
    }

    public PropertyAttributes getProperty() {
        return property;
    }

    public void setProperty(PropertyAttributes property) {
        this.property = property;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
