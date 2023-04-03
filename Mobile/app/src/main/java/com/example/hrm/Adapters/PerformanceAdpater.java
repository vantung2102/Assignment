package com.example.hrm.Adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.HomeActivity;
import com.example.hrm.R;
import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.databinding.PerformanceItemBinding;

import java.util.List;

public class PerformanceAdpater extends RecyclerView.Adapter<PerformanceAdpater.PerformanceViewholder>{
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
        PerformanceItemBinding binding=PerformanceItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new PerformanceViewholder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull PerformanceViewholder holder, int position) {
        if(holder instanceof PerformanceViewholder){
            PerformanceAttributes att=data.get(position);
            holder.binding.txtIndex.setText(String.valueOf(position+1));
            holder.binding.txtName.setText(att.getStaff().getFullname());
            holder.binding.txtStatus.setText(att.getStatus());
        }
    }

    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    class PerformanceViewholder extends RecyclerView.ViewHolder{
        PerformanceItemBinding binding;
        public PerformanceViewholder(@NonNull PerformanceItemBinding binding) {
            super(binding.getRoot());
            this.binding=binding;
        }
    }
}
