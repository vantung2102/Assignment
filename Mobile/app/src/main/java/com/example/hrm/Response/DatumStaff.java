package com.example.hrm.Response;


import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import javax.annotation.Generated;

@Generated("jsonschema2pojo")
public class DatumStaff {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("attributes")
    @Expose
    private StaffAttributes attributes;

    public DatumStaff(DatumTemplate<StaffAttributes> item) {
        this.id=item.getId();
        this.type=item.getType();
        this.attributes= item.getAttributes();
    }

    public DatumStaff(StaffAttributes staff) {
        this.id= String.valueOf(staff.getId());
        this.type=staff.getStatus();
        this.attributes= staff;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public StaffAttributes getAttributes() {
        return attributes;
    }

    public void setAttributes(StaffAttributes attributes) {
        this.attributes = attributes;
    }

}