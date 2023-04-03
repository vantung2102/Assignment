package com.example.hrm.viewmodel;


import android.text.TextUtils;
import android.widget.ArrayAdapter;

import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import com.example.hrm.BR;
import com.example.hrm.Response.PropertyAttributes;
import com.example.hrm.Response.Staff;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class RequestPropertyVIewModel extends BaseObservable {
    boolean isSubmitted=false;
    @Bindable
    public boolean isSubmitted() {
        return isSubmitted;
    }

    public void setSubmitted(boolean submitted) {
        isSubmitted = submitted;
        notifyPropertyChanged(BR.submitted);
    }

    @SerializedName("id")
    @Expose
    private Integer id;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("request_type")
    @Expose
    private String requestType;
    @SerializedName("reason")
    @Expose
    private String reason;
    @SerializedName("description")
    @Expose
    private String description;
    @SerializedName("requester")
    @Expose
    private Staff requester;
    @SerializedName("approver")
    @Expose
    private Staff approver;
    @SerializedName("group_property")
    @Expose
    private String groupProperty;
    @SerializedName("created_at")
    @Expose
    private String createdAt;
    @SerializedName("updated_at")
    @Expose
    private String updatedAt;
    @SerializedName("comments")
    @Expose
    private List<Object> comments;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    @Bindable
    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
        notifyPropertyChanged(BR.requestType);
    }
    @Bindable
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
        notifyPropertyChanged(BR.reason);
    }
    @Bindable
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        notifyPropertyChanged(BR.description);

    }

    public Staff getRequester() {
        return requester;
    }

    public void setRequester(Staff requester) {
        this.requester = requester;
    }

    public Object getApprover() {
        return approver;
    }

    public void setApprover(Staff approver) {
        this.approver = approver;
    }
    @Bindable
    public String getGroupProperty() {
        return groupProperty;
    }

    public void setGroupProperty(String groupProperty) {
        this.groupProperty = groupProperty;
        notifyPropertyChanged(BR.groupProperty);
    }
    private ArrayAdapter<String> adapterGroup;
    @Bindable
    public ArrayAdapter<String> getAdapterGroup() {
        return adapterGroup;
    }

    public void setAdapterGroup(ArrayAdapter<String> adapter) {
        this.adapterGroup = adapter;
        notifyPropertyChanged(BR.adapterGroup);
    }
    private ArrayAdapter<String> adapterType;
    @Bindable
    public ArrayAdapter<String> getAdapterType() {
        return adapterType;
    }
    public boolean check() {
        if(TextUtils.isEmpty(description)) return false;
        if(TextUtils.isEmpty(reason)) return false;
        if(TextUtils.isEmpty(groupProperty)) return false;
        if(TextUtils.isEmpty(requestType)) return false;
        return true;
    }
    public void setAdapterType(ArrayAdapter<String> adapter) {
        this.adapterType = adapter;
        notifyPropertyChanged(BR.adapterType);
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

    public List<Object> getComments() {
        return comments;
    }

    public void setComments(List<Object> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "RequestPropertyAttributes{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", requestType='" + requestType + '\'' +
                ", reason='" + reason + '\'' +
                ", description='" + description + '\'' +
                ", requester=" + requester +
                ", approver=" + approver +
                ", groupProperty=" + groupProperty +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                ", comments=" + comments +
                '}';
    }
}
