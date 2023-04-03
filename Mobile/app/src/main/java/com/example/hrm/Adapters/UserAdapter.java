package com.example.hrm.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Constant;
import com.example.hrm.HomeActivity;
import com.example.hrm.NewEmployeeFragment;
import com.example.hrm.R;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.Datum;
import com.example.hrm.Response.DatumStaff;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.StaffFragment;
import com.example.hrm.StaffFragmentView;
import com.example.hrm.StaffInfoFragment;
import com.example.hrm.databinding.DepartmentItemBinding;
import com.example.hrm.databinding.StaffItemBinding;

import java.util.ArrayList;
import java.util.List;

public class UserAdapter extends RecyclerView.Adapter<UserAdapter.StaffViewHolder>{
    List<DatumStaff> data;
    private LayoutInflater layoutInflater;
    Context mContext;
    String type;
    HomeActivity homeActivity; StaffFragmentView view;
    private boolean isShowCurrentList=false;
    private List<DatumStaff> currentList;
    private String showLikeKey;

    public UserAdapter(StaffFragmentView view) {
        this.view = view;
    }

    public UserAdapter() {
    }

    public void setData(List<DatumStaff> desDepartments, Context mContext, HomeActivity homeActivity){
        this.homeActivity=homeActivity;
        this.type=type;
        this.data=desDepartments;
        this.mContext=mContext;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public StaffViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        StaffItemBinding staffItemBinding=StaffItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return  new StaffViewHolder(staffItemBinding);
    }

    @Override
    public void onBindViewHolder(@NonNull StaffViewHolder holder, int position) {

        StaffAttributes att;
        if(!isShowCurrentList)
        {
            att=data.get(position).getAttributes();
        } else {
            att=currentList.get(position).getAttributes();
        }
        String type=data.get(position).getType();
        if(att== null) return;
        if(type.equals(Constant.DEPARTMENT_TYPE)){
            //holder.staffItemBinding.imgAvar.setText(att.getName());
        }
        else if(type.equals(Constant.JOBTITLE_TYPE)){

        }
        else if(type.equals(Constant.POSITION_TYPE)){

        }
        holder.staffItemBinding.txtName.setText(att.getFullname());
        holder.staffItemBinding.btnShow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                Toast.makeText(mContext, "btnShow", Toast.LENGTH_SHORT).show();
                    showInfo(att);
            }
        });
        holder.staffItemBinding.txtIndex.setText(String.valueOf(att.getId()));
        holder.staffItemBinding.btnEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showEditForm(att);
            }
        });
//        holder.staffItemBinding.btnDelete.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                showDelete(att);
//            }
//        });
    }

    private void showInfo(StaffAttributes att) {
        //Toast.makeText(mContext, "showInfo", Toast.LENGTH_SHORT).show();
        homeActivity.addOrRemoveBackButton(true);
        StaffInfoFragment staffInfoFragment=new StaffInfoFragment(att);
        final Bundle args = new Bundle();
        args.putString("TAG", staffInfoFragment.MY_TAG);
        staffInfoFragment.setArguments(args);
        homeActivity.relaceFragment(staffInfoFragment);
    }

    private void showDelete(Attributes department) {
        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setTitle("Delete Department");
        String str="Are you sure delete '"+department.getName()+"' ?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {

            }
        });


        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });

        alertDialog.show();
    }

    private void showEditForm(StaffAttributes staff) {
        view.showFormAddDepartment(staff);
    }

    @Override
    public int getItemCount() {
        if(isShowCurrentList) {
            if(currentList!=null) return currentList.size();
            return 0;
        }
        if(data!=null) return data.size();
        return 0;
    }

    public void showLike(String staffName) {
        isShowCurrentList=true;
        List<DatumStaff> list=new ArrayList<>();
        this.data.forEach(item->{
            if(item.getAttributes().getFullname().contains(staffName)){
                list.add(item);
            }
        });
        this.currentList=list;
        notifyDataSetChanged();
    }

    public void showAll() {
        this.isShowCurrentList=false;
        notifyDataSetChanged();
    }

    class StaffViewHolder extends RecyclerView.ViewHolder{
        StaffItemBinding staffItemBinding;
        public StaffViewHolder(@NonNull StaffItemBinding staffItemBinding) {
            super(staffItemBinding.getRoot());
            this.staffItemBinding=staffItemBinding;
        }
        //DepartmentItemBinding departmentItemBinding;

    }
}
