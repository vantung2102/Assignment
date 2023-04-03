package com.example.hrm.viewmodel;

import androidx.databinding.BaseObservable;
import androidx.databinding.Bindable;

import com.example.hrm.OnboardingSampleFragment;

public class AddOnboardingTaskViewModel{
    private String position;
    private String task;
    private String description;


    public AddOnboardingTaskViewModel(String position, String task, String description) {
        this.position = position;
        this.task = task;
        this.description = description;
    }

    public AddOnboardingTaskViewModel() {
    }
    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;

    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIDoSomeThing(OnboardingSampleFragment.IDoSomeThing icIDoSomeThing) {
        
    }
}
