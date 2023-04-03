package com.example.hrm.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.DetailPropertyProvidingHistoryFragment;
import com.example.hrm.HomeActivity;
import com.example.hrm.R;
import com.example.hrm.Response.PropertyHistoryAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.PropertyProvidingHistoriesItemBinding;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProvidingHistoryAdapter extends RecyclerView.Adapter<ProvidingHistoryAdapter.PropertyHistoryViewHolder> {
    List<PropertyHistoryAttributes> data;
    private  boolean visibleActionCol=false;
    public ProvidingHistoryAdapter(boolean b) {
        //this.visibleActionCol=b;
    }

    public ProvidingHistoryAdapter() {
    }
    private HomeActivity activity;
    private Context mContext;
    public void setData(List<PropertyHistoryAttributes> data, Context mContext, HomeActivity activity){
        this.data=data;
        this.mContext=mContext;
        this.activity=activity;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public PropertyHistoryViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        PropertyProvidingHistoriesItemBinding propertyHistoryItemBinding=PropertyProvidingHistoriesItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new PropertyHistoryViewHolder(propertyHistoryItemBinding);
    }

    @Override
    public void onBindViewHolder(@NonNull PropertyHistoryViewHolder holder, int position) {
        PropertyHistoryAttributes attributes= data.get(position);
        holder.binding.txtIndex.setText(String.valueOf(position+1));
        if(attributes.getProperty()!=null){
            holder.binding.txtProperty.setText(attributes.getProperty().getName());
        }

        //holder.binding.txtProvideDate.setText(attributes.getCreatedAt());
        holder.binding.txtType.setText(attributes.getStatus());
        if(attributes.getStatus().equals(Common.STATUS_PROVIDED)){
            holder.binding.txtType.setBackground(mContext.getDrawable(R.drawable.layout_rounded_border_green));
            holder.binding.txtType.setTextColor(mContext.getColor(R.color.toast_success_bold));
        }
            else {
            holder.binding.txtType.setText("recalled");
            holder.binding.txtType.setBackground(mContext.getDrawable(R.drawable.layout_rounded_border_red));
            holder.binding.txtType.setTextColor(mContext.getColor(R.color.toast_failed_bold));
        }
        holder.binding.txtProvider.setText(attributes.getProvider().getFullname());
        holder.binding.txtReceiver.setText(attributes.getReceiver().getFullname());
        //holder.binding.columnAction.setVisibility(View.VISIBLE);
        holder.binding.showBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DetailPropertyProvidingHistoryFragment fragment=new DetailPropertyProvidingHistoryFragment(attributes);
                Bundle bundle = new Bundle();
                bundle.putString("TAG",fragment.MY_TAG);
                fragment.setArguments(bundle);
                activity.relaceFragment(fragment);
            }
        });
        holder.binding.deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showFormDelete(attributes,position,mContext);
            }
        });
    }
    private void showFormDelete(PropertyHistoryAttributes att, int position, Context context) {
        AlertDialog alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Delete Department");
        String str="Are you sure delete this history "+"?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Call<ResponseBody> call = APIService.getService().deleteProvidingHistory(Common.getToken(), att.getId());

                call.enqueue(new Callback() {
                    @Override
                    public void onResponse(Call call, Response response) {
                        if(response.isSuccessful()){
                            data.remove(att);
                            notifyItemRemoved(position);
                        }
                    }

                    @Override
                    public void onFailure(Call call, Throwable t) {

                    }
                });
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
    @Override
    public int getItemCount() {
        if(data!=null) return data.size();
        return 0;
    }

    class PropertyHistoryViewHolder extends RecyclerView.ViewHolder{
        PropertyProvidingHistoriesItemBinding binding;
        public PropertyHistoryViewHolder(@NonNull PropertyProvidingHistoriesItemBinding binding) {
            super(binding.getRoot());
            this.binding=binding;
        }
    }
}
