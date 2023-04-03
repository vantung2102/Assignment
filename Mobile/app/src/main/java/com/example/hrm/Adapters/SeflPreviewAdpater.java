package com.example.hrm.Adapters;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.HomeActivity;
import com.example.hrm.NewEmployeeFragment;
import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.SelfPreviewDetail;
import com.example.hrm.StaffTimeOffFragment;
import com.example.hrm.databinding.PerformanceItemBinding;
import com.example.hrm.databinding.SelfPreviewInProgressItemBinding;

import java.util.List;

public class SeflPreviewAdpater extends RecyclerView.Adapter<SeflPreviewAdpater.PerformanceViewholder>{
    private List<PerformanceAttributes> data;
    private HomeActivity activity;
    public void setData(List<PerformanceAttributes> data, HomeActivity activity){
        this.data=data;
        this.activity = activity;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public PerformanceViewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        SelfPreviewInProgressItemBinding binding=SelfPreviewInProgressItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new PerformanceViewholder(binding);
    }
    @Override
    public void onBindViewHolder(@NonNull PerformanceViewholder holder, int position) {
        if(holder instanceof PerformanceViewholder){
            PerformanceAttributes att=data.get(position);
            holder.binding.txtIndex.setText(String.valueOf(position+1));
            holder.binding.txtName.setText(att.getStaff().getFullname());
            holder.binding.txtStatus.setText(att.getStatus());
            holder.binding.txtStartDate.setText(att.getStartDate());
            holder.binding.txtEndDate.setText(att.getEndDate());
            holder.binding.txtName.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    SelfPreviewDetail fragment=new SelfPreviewDetail(att);
                    final Bundle args = new Bundle();
                    args.putString("TAG", fragment.MY_TAG);
                    fragment.setArguments(args);
                    activity.relaceFragment(fragment);
                }
            });
            }
    }

    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    class PerformanceViewholder extends RecyclerView.ViewHolder{
        SelfPreviewInProgressItemBinding binding;
        public PerformanceViewholder(@NonNull SelfPreviewInProgressItemBinding binding) {
            super(binding.getRoot());
            this.binding=binding;
        }
    }
}
