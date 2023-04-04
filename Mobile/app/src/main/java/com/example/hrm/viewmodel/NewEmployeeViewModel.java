package com.example.hrm.viewmodel;

import android.text.TextUtils;
import android.util.Log;

import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import com.example.hrm.BR;
import com.example.hrm.Response.StaffAttributes;

public class NewEmployeeViewModel extends BaseObservable {
    public static final int fullNameType=0,passwordType=1,emailType=2,confirmPasswordType=3,phoneType=4,dateOfBirthType=5,joinDateType=6,genderType=7,departmentType=8;
    public static final int positionType=9,jobtitleType=10,managerType=11,addressType=12;
    private String fullName="";
    private String password="";
    private String email="";
    private String confirmPassword="";
    private String phone="";
    private String dateOfBirth="";
    private String joinDate="";
    private String gender="";
    private String department="";
    private String position="";
    private String jobtitle="";
    private String manager="";
    private String address="";
    private boolean isFullNameVisible=false;
    private boolean isPasswordVisible=false;
    private boolean isEmailVisible=false;
    private boolean isConfirmPasswordVisible=false;
    private boolean isPhoneVisisble=false;
    private boolean isDateOfBirthVisible=false;
    private boolean isJoinDateVisible=false;
    private boolean isGenderVisible=false;
    private boolean isDepartmentVisible=false;
    private boolean isPositionVisible=false;
    private boolean isJobtitleVisible=false;
    private boolean isManagerVisible=false;
    private boolean isAddressVisible=false;

    public NewEmployeeViewModel(StaffAttributes staff) {
        if(staff!=null){
            Log.d("staff",staff.toString());
            setAddress(staff.getAddress());
            //if(staff.getUpperLevel()!=null) setManager(staff.getUpperLevel().getFullname());
            //setJobtitle(staff.getJobTitle()!=null?staff.getJobTitle().getTitle():"");
            //setPosition(staff.getPosition()!=null?staff.getPosition().getName():"");
            //setDepartment(staff.getDepartment().getName());
            setGender(staff.getGender());
            setDateOfBirth(staff.getDateOfBirth()!=null?staff.getDateOfBirth().toString():"");
            setJoinDate(staff.getJoinDate()!=null?staff.getJoinDate().toString():"");
            //setPassword(staff.get);
           // setConfirmPassword();
            setEmail(staff.getEmail());
            setFullName(staff.getFullname());
            setPhone(staff.getPhone());
        }
    }

    @Bindable
    public boolean isPasswordVisible() {
        return isPasswordVisible;
    }

    public void setPasswordVisible(boolean passwordVisible) {
        isPasswordVisible = passwordVisible;
        notifyPropertyChanged(BR.passwordVisible);
    }
    @Bindable
    public boolean isEmailVisible() {
        return isEmailVisible;
    }

    public void setEmailVisible(boolean emailVisible) {
        isEmailVisible = emailVisible;
        notifyPropertyChanged(BR.emailVisible);
    }
    @Bindable
    public boolean isConfirmPasswordVisible() {
        return isConfirmPasswordVisible;
    }

    public void setConfirmPasswordVisible(boolean confirmPasswordVisible) {
        isConfirmPasswordVisible = confirmPasswordVisible;
        notifyPropertyChanged(BR.confirmPasswordVisible);
    }
    @Bindable
    public boolean isPhoneVisisble() {
        return isPhoneVisisble;
    }

    public void setPhoneVisisble(boolean phoneVisisble) {
        isPhoneVisisble = phoneVisisble;
        notifyPropertyChanged(BR.phoneVisisble);
    }
    @Bindable
    public boolean isDateOfBirthVisible() {
        return isDateOfBirthVisible;
    }

    public void setDateOfBirthVisible(boolean dateOfBirthVisible) {
        isDateOfBirthVisible = dateOfBirthVisible;
        notifyPropertyChanged(BR.dateOfBirthVisible);
    }
    @Bindable
    public boolean isJoinDateVisible() {
        return isJoinDateVisible;
    }

    public void setJoinDateVisible(boolean joinDateVisible) {
        isJoinDateVisible = joinDateVisible;
        notifyPropertyChanged(BR.joinDateVisible);
    }
    @Bindable
    public boolean isGenderVisible() {
        return isGenderVisible;
    }

    public void setGenderVisible(boolean genderVisible) {
        isGenderVisible = genderVisible;
        notifyPropertyChanged(BR.genderVisible);
    }
    @Bindable
    public boolean isDepartmentVisible() {
        return isDepartmentVisible;
    }

    public void setDepartmentVisible(boolean departmentVisible) {
        isDepartmentVisible = departmentVisible;
        notifyPropertyChanged(BR.departmentVisible);
    }
    @Bindable
    public boolean isPositionVisible() {
        return isPositionVisible;
    }

    public void setPositionVisible(boolean positionVisible) {
        isPositionVisible = positionVisible;
        notifyPropertyChanged(BR.positionVisible);
    }
    @Bindable
    public boolean isJobtitleVisible() {
        return isJobtitleVisible;
    }

    public void setJobtitleVisible(boolean jobtitleVisible) {
        isJobtitleVisible = jobtitleVisible;
        notifyPropertyChanged(BR.jobtitleVisible);
    }
    @Bindable
    public boolean isManagerVisible() {
        return isManagerVisible;
    }

    public void setManagerVisible(boolean managerVisible) {
        isManagerVisible = managerVisible;
        notifyPropertyChanged(BR.managerVisible);
    }
    @Bindable
    public boolean isAddressVisible() {
        return isAddressVisible;
    }

    public void setAddressVisible(boolean addressVisible) {
        isAddressVisible = addressVisible;
        notifyPropertyChanged(BR.addressVisible);
    }

    private boolean isSubmited=false;
    public NewEmployeeViewModel(String fullName, String password, String email, String confirmPassword, String phone, String dateOfBirth, String joinDate, String gender, String department, String position, String jobtitle, String manager, String address) {
        this.fullName = fullName;
        this.password = password;
        this.email = email;
        this.confirmPassword = confirmPassword;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.joinDate = joinDate;
        this.gender = gender;
        this.department = department;
        this.position = position;
        this.jobtitle = jobtitle;
        this.manager = manager;
        this.address = address;

    }

    public NewEmployeeViewModel() {
    }

    @Bindable
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
        notifyPropertyChanged(BR.fullName);
        check(fullNameType);
    }
    @Bindable
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
        notifyPropertyChanged(BR.password);
        check(passwordType);
    }
    @Bindable
    public String getEmail() {
        return email;

    }

    public void setEmail(String email) {
        this.email = email;
        notifyPropertyChanged(BR.email);
        check(emailType);
    }
    @Bindable
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
        notifyPropertyChanged(BR.confirmPassword);
        check(confirmPasswordType);
    }
    @Bindable
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
        notifyPropertyChanged(BR.phone);
        check(phoneType);
    }
    @Bindable
    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        notifyPropertyChanged(BR.dateOfBirth);
        check(dateOfBirthType);
    }
    @Bindable
    public String getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(String joinDate) {
        this.joinDate = joinDate;
        notifyPropertyChanged(BR.joinDate);
        check(joinDateType);
    }
    @Bindable
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
        notifyPropertyChanged(BR.gender);
        check(genderType);
    }
    @Bindable
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
        notifyPropertyChanged(BR.department);
        check(departmentType);
    }
    @Bindable
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
        notifyPropertyChanged(BR.position);
        check(positionType);
    }
    @Bindable
    public String getJobtitle() {
        return jobtitle;
    }

    public void setJobtitle(String jobtitle) {

        this.jobtitle = jobtitle;
        notifyPropertyChanged(BR.jobtitle);
        check(jobtitleType);
    }
    @Bindable
    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
        notifyPropertyChanged(BR.manager);
        check(managerType);
    }
    @Bindable
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
        notifyPropertyChanged(BR.address);
        check(addressType);
    }
    @Bindable
    public boolean isFullNameVisible() {
        return isFullNameVisible;
    }

    public void setFullNameVisible(boolean fullNameVisible) {
        isFullNameVisible = fullNameVisible;
        notifyPropertyChanged(BR.fullNameVisible);
    }
    @Bindable
    public boolean isSubmited() {
        return isSubmited;
    }

    public void setSubmited(boolean submited) {
        isSubmited = submited;
        check(fullNameType);
        check(emailType);
        check(passwordType);
        check(confirmPasswordType);
        check(phoneType);
        check(dateOfBirthType);
        check(joinDateType);
        check(genderType);
        check(departmentType);
        check(positionType);
        check(jobtitleType);
        check(managerType);
        check(addressType);
    }

    public void check(int type){
        String strCheck;
        if(!isSubmited) return;
        switch (type){
            case fullNameType:
                if(TextUtils.isEmpty(this.fullName)) setFullNameVisible(true); else setFullNameVisible(false);break;
            case emailType:
                if(TextUtils.isEmpty(this.email)) setEmailVisible(true); else setEmailVisible(false);break;
            case passwordType:
                if(TextUtils.isEmpty(this.password)) setPasswordVisible(true); else setPasswordVisible(false);break;
            case confirmPasswordType:
                if(TextUtils.isEmpty(this.confirmPassword)) setConfirmPasswordVisible(true); else setConfirmPasswordVisible(false);break;
            case phoneType:
                if(TextUtils.isEmpty(this.phone)) setPhoneVisisble(true); else setPhoneVisisble(false);break;
            case dateOfBirthType:
                if(TextUtils.isEmpty(this.dateOfBirth)) setDateOfBirthVisible(true); else setDateOfBirthVisible(false);break;
            case joinDateType:
                if(TextUtils.isEmpty(this.joinDate)) setJoinDateVisible(true); else setJoinDateVisible(false);break;
            case genderType:
                if(TextUtils.isEmpty(this.gender)) setGenderVisible(true); else setGenderVisible(false);break;
            case departmentType:
                if(TextUtils.isEmpty(this.department)) setDepartmentVisible(true); else setDepartmentVisible(false);break;
            case positionType:
                if(TextUtils.isEmpty(this.position)) setPositionVisible(true); else setPositionVisible(false);break;
            case jobtitleType:
                if(TextUtils.isEmpty(this.jobtitle)) setJobtitleVisible(true); else setJobtitleVisible(false);break;
            case managerType:
                if(TextUtils.isEmpty(this.manager)) setManagerVisible(true); else setManagerVisible(false);break;
            case addressType:
                if(TextUtils.isEmpty(this.address)) setAddressVisible(true); else setAddressVisible(false);break;
        }

    }

    public boolean checkAll() {
        boolean check=true;
        if(isFullNameVisible||isEmailVisible||isPhoneVisisble||isDateOfBirthVisible||isJoinDateVisible||isGenderVisible||isDepartmentVisible||isPositionVisible||isJobtitleVisible||isManagerVisible||isAddressVisible){
            check=false;
        }
        if((isPasswordVisible||isConfirmPasswordVisible)&&isCheckPassword){
            check=false;
        }
        return check;
    }
    private boolean isCheckPassword=true;
    public void setCheckPassword(boolean b) {
        isCheckPassword=b;
    }
}
