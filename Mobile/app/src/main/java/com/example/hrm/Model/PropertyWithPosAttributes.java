package com.example.hrm.Model;

import com.example.hrm.Response.PropertyAttributes;

public class PropertyWithPosAttributes {
    PropertyAttributes property;
    int positon;

    public PropertyWithPosAttributes(PropertyAttributes property, int positon) {
        this.property = property;
        this.positon = positon;
    }

    public PropertyAttributes getProperty() {
        return property;
    }

    public void setProperty(PropertyAttributes property) {
        this.property = property;
    }

    public int getPositon() {
        return positon;
    }

    public void setPositon(int positon) {
        this.positon = positon;
    }
}
