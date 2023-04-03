package com.example.hrm.Adapters;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Build;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Common;
import com.example.hrm.R;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.StaffOnboardingFragment;
import com.example.hrm.databinding.FragmentStaffOnboardingBinding;
import com.example.hrm.databinding.OnboardingItemBinding;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class StaffOnboardingAdapter extends RecyclerView.Adapter<StaffOnboardingAdapter.StaffOnboardingViewholder>{

    private List<DatumTemplate<OnboardingByStaffAttributes>> data;

    @NonNull
    @Override
    public StaffOnboardingViewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        OnboardingItemBinding onboardingItemBinding=OnboardingItemBinding.inflate(LayoutInflater.from(parent.getContext()),parent,false);
        return new StaffOnboardingViewholder(onboardingItemBinding);
     }

    @Override
    public void onBindViewHolder(@NonNull StaffOnboardingViewholder holder, int position) {
        DatumTemplate<OnboardingByStaffAttributes> datumTemplate= data.get(position);
        OnboardingByStaffAttributes attributes=datumTemplate.getAttributes();
        holder.onboardingItemBinding.txtTaskName.setText(attributes.getOnboardingSampleStep().getTask());
        holder.onboardingItemBinding.txtStatus.setText(attributes.getStatus());
        holder.onboardingItemBinding.txtIndex.setText(String.valueOf(position+1));
        if(attributes.getAssignedPerson()!=null){
            holder.onboardingItemBinding.txtAssignto.setText(attributes.getAssignedPerson().toString());
        }

        if(attributes.getStartDate()!=null){
            holder.onboardingItemBinding.txtStartDate.setText(attributes.getStartDate().toString());
        }

        if(attributes.getDueDate()!=null){
            holder.onboardingItemBinding.txtEndDate.setText(attributes.getDueDate().toString());
        }

        holder.onboardingItemBinding.imgEdit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d("imgEdit","click");
                final View view2 = LayoutInflater.from(view.getContext()).inflate(R.layout.update_onborading_staff_dialog, null);
                AlertDialog alertDialog = new AlertDialog.Builder(view.getContext()).create();
                //alertDialog.setTitle("Add Department");
                alertDialog.setIcon(R.drawable.add);
                alertDialog.setCancelable(true);
//        alertDialog.setMessage("Your Message Here");
                Date date=new Date();
                final AutoCompleteTextView autoCompleteTextView = (AutoCompleteTextView) view2.findViewById(R.id.AutoCompleteTextView);
                ArrayAdapter<String> adapter=new ArrayAdapter<>(view.getContext(), android.R.layout.simple_list_item_1, Common.getStaffNames());
                autoCompleteTextView.setAdapter(adapter);
                autoCompleteTextView.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent motionEvent) {
                        autoCompleteTextView.showDropDown();
                        return false;
                    }
                });
                final EditText edt_start_date = (EditText) view2.findViewById(R.id.idEdtStartDate);
                TextView txt_message= view2.findViewById(R.id.txt_message);
                edt_start_date.setText("");
                edt_start_date.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                    DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        String date = i2 + "-" + (++i1) + "-" + i;
                        edt_start_date.setText(date);
                    }
                }, LocalDate.now().getYear(),LocalDate.now().getMonth().getValue()-1,LocalDate.now().getDayOfMonth());
                datePickerDialog.show();
                    }
                });

                final EditText edt_due_day = (EditText) view2.findViewById(R.id.idEdtDueDate);
                edt_due_day.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                            @Override
                            public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                                String date = i2 + "-" + (++i1) + "-" + i;
                                edt_due_day.setText(date);
                            }
                        },LocalDate.now().getYear(),LocalDate.now().getMonth().getValue()-1,LocalDate.now().getDayOfMonth());
                        datePickerDialog.show();
                    }
                });
                edt_due_day.setText("");
                alertDialog.setOnShowListener(new DialogInterface.OnShowListener() {
                    @Override
                    public void onShow(DialogInterface dialogInterface) {
                        ((AlertDialog)dialogInterface).getButton(AlertDialog.BUTTON_POSITIVE)
                                .setOnClickListener(new View.OnClickListener() {
                                    @Override
                                    public void onClick(View view) {
                                        String timeStart=edt_start_date.getText().toString();
                                        String timeDue=edt_due_day.getText().toString();
                                        SimpleDateFormat sdformat = new SimpleDateFormat("dd-MM-yyyy");
                                        //Toast.makeText(view.getContext(), "ok", Toast.LENGTH_SHORT).show();
                                        try {
                                            Date d1= sdformat.parse(timeStart);
                                            Date d2= sdformat.parse(timeDue);
                                            if(d1.compareTo(d2)>0){
                                                Log.d("Date 1 occurs after Date 2","asa");
                                                txt_message.setText("Due Day greater than or equal to Start day");

                                            } else {
                                                Log.d("Date 1 occurs before Date 2","asa");
                                                alertDialog.dismiss();
                                            }
                                        } catch (ParseException e) {
                                            throw new RuntimeException(e);
                                        }
                                    }
                                });
                    }
                });
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


                alertDialog.setView(view2);
                alertDialog.show();
//                DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
//                    @Override
//                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
//                        String date = i2 + "/" + (++i1) + "/" + i;
//                        Log.d("imgEdit",date);
//                    }
//                },2023,2,19);
//                datePickerDialog.show();
            }
        });
        holder.onboardingItemBinding.imgDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDelete(attributes, view.getContext());
            }
        });

    }
    private void showDelete(OnboardingByStaffAttributes attributes, Context mContext) {
        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();
        alertDialog.setTitle("Delete Onborading");
        String str="Are you sure delete '"+attributes.getOnboardingSampleStep().getTask()+"' ?";
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
    @Override
    public int getItemCount() {
        if(data!=null) return data.size();return 0;
    }

    public void setData(List<DatumTemplate<OnboardingByStaffAttributes>> data) {
        this.data=data;
        notifyDataSetChanged();
    }

    class StaffOnboardingViewholder extends RecyclerView.ViewHolder{
        OnboardingItemBinding onboardingItemBinding;
        public StaffOnboardingViewholder(@NonNull OnboardingItemBinding onboardingItemBinding) {
            super(onboardingItemBinding.getRoot());
            this.onboardingItemBinding=onboardingItemBinding;
        }
    }
}
