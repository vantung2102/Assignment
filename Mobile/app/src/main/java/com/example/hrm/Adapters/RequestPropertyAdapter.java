package com.example.hrm.Adapters;

import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.DetailPropertyProvidingHistoryFragment;
import com.example.hrm.DetailRequestPropertyFragment;
import com.example.hrm.HomeActivity;
import com.example.hrm.R;
import com.example.hrm.Response.PropertyHistoryAttributes;
import com.example.hrm.Response.RequestPropertyAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentDetailRequestPropertyBinding;
import com.example.hrm.databinding.PropertyHistoryItemBinding;
import com.example.hrm.databinding.RequestPropertyItemBinding;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RequestPropertyAdapter extends RecyclerView.Adapter<RequestPropertyAdapter.PropertyHistoryViewHolder> {
    List<RequestPropertyAttributes> data;
    List<RequestPropertyAttributes> filterData;
    private  boolean visibleActionCol=false;
    public RequestPropertyAdapter(boolean b) {
        this.visibleActionCol=b;
    }
    private String status="";
    public RequestPropertyAdapter() {
    }
    private HomeActivity activity;
    private Context mContext;
    public void setData(List<RequestPropertyAttributes> data, Context mContext, HomeActivity activity){
        this.data=data;
        this.mContext=mContext;
        this.activity=activity;
        notifyDataSetChanged();
    }
    @NonNull
    @Override
    public PropertyHistoryViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        RequestPropertyItemBinding propertyHistoryItemBinding=RequestPropertyItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new PropertyHistoryViewHolder(propertyHistoryItemBinding);
    }

    @Override
    public void onBindViewHolder(@NonNull PropertyHistoryViewHolder holder, int position) {
        RequestPropertyAttributes attributes=null;
        if(!isFilter) attributes= data.get(position); else attributes=filterData.get(position);
        holder.binding.txtStt.setText(String.valueOf(position+1));
//        if(attributes.getProperty()!=null){
//            holder.binding.txtProperty.setText(attributes.getProperty().getName());
//        }
        Log.d("attributes",attributes.toString());
        holder.binding.txtRequester.setText(attributes.getRequester()!=null?attributes.getRequester().getFullname():" ");
        holder.binding.txtType.setText(attributes.getRequestType());
        holder.binding.txtStatus.setText(attributes.getStatus());
        holder.binding.txtProperty.setText(attributes.getGroupProperty().getName());
        if(attributes.getStatus().equals(Common.STATUS_APPROVED)){
            holder.binding.txtStatus.setBackground(mContext.getDrawable(R.drawable.layout_rounded_border_green));
            holder.binding.txtStatus.setTextColor(mContext.getColor(R.color.toast_success_bold));
        } else if(attributes.getStatus().equals(Common.STATUS_CANCLED))
             {
            holder.binding.txtStatus.setBackground(mContext.getDrawable(R.drawable.layout_rounded_border_red));
            holder.binding .txtStatus.setTextColor(mContext.getColor(R.color.toast_failed_bold));
        }else{
            holder.binding.txtStatus.setBackground(mContext.getDrawable(R.drawable.layout_rounded_border_yellow));
            holder.binding .txtStatus.setTextColor(mContext.getColor(R.color.pending));
        }
        holder.binding.txtRequester.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RequestPropertyAttributes attributes=null;
                if(!isFilter) attributes= data.get(position); else attributes=filterData.get(position);
                activity.addOrRemoveBackButton(true);
                DetailRequestPropertyFragment fragment=new DetailRequestPropertyFragment(attributes);
                Bundle bundle = new Bundle();
                bundle.putString("TAG",fragment.MY_TAG);
                fragment.setArguments(bundle);
                activity.relaceFragment(fragment);
            }
        });
//        holder.binding.showBtn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                DetailPropertyProvidingHistoryFragment fragment=new DetailPropertyProvidingHistoryFragment(attributes);
//                Bundle bundle = new Bundle();
//                bundle.putString("TAG",fragment.MY_TAG);
//                fragment.setArguments(bundle);
//                activity.relaceFragment(fragment);
//            }
//        });
        holder.binding.deleteBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                RequestPropertyAttributes attributes=null;
                if(!isFilter) attributes= data.get(position); else attributes=filterData.get(position);showFormDelete(attributes,position,mContext);
            }
        });
    }
    private void showFormDelete(RequestPropertyAttributes att, int position, Context context) {
        AlertDialog alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setTitle("Delete Department");
        String str="Are you sure delete this history "+"?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Call<ResponseBody> call = APIService.getService().deleteRequestProperty(Common.getToken(), att.getId());

                call.enqueue(new Callback() {
                    @Override
                    public void onResponse(Call call, Response response) {
                        if(response.isSuccessful()){
                            if(!status.equals("")){
                             filterData.remove(att);
                            }
                            data.remove(att);
                            notifyItemRemoved(position);
                            activity.showToast(true,"Delete Request Property Success!");
                        } else  activity.showToast(false,"Delete Request Property Failed!");
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
        if(!isFilter){
            if(data!=null) return data.size();

        }  else if(filterData!=null) return filterData.size();
        return 0;
    }
    private  boolean isFilter=false;
    public void showFilter(String status) {
        this.status=status;
        this.filterData=new ArrayList<>();
        data.forEach(item->{if(item.getStatus().equals(status.toLowerCase(Locale.ROOT))) filterData.add(item);});
        this.isFilter=true;
        notifyDataSetChanged();
    }

    class PropertyHistoryViewHolder extends RecyclerView.ViewHolder{
        RequestPropertyItemBinding binding;
        public PropertyHistoryViewHolder(@NonNull RequestPropertyItemBinding binding) {
            super(binding.getRoot());
            this.binding=binding;
        }
    }
}
