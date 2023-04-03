package com.example.hrm;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.StrictMode;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Adapters.LeaveAdapter;
import com.example.hrm.Adapters.LeaveApplicationAdapter;
import com.example.hrm.Response.DataListHasMetaResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.AddLeaveDialogBinding;
import com.example.hrm.databinding.FragmentLeaveApplicationBinding;
import com.example.hrm.databinding.FragmentLeaveBinding;
import com.example.hrm.viewmodel.AddLeaveViewModel;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link LeaveApplicationFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class LeaveApplicationFragment extends Fragment {
    public  static final String MY_TAG= "LeaveApplicationFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public LeaveApplicationFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment LeaveFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static LeaveApplicationFragment newInstance(String param1, String param2) {
        LeaveApplicationFragment fragment = new LeaveApplicationFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
        getData();
    }
    List<LeaveApplicationAttributes> data=new ArrayList<>();
    private void getData() {
        Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call= APIService.getService().getAllLeaveApplication(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call, Response<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> response) {

                DataResponseList res= response.body();
                Log.d("onResponse","onResponse szie"+res.getData().size());
                res.getData().forEach(item->{
                    DatumTemplate<LeaveApplicationAttributes> datumTemplate= (DatumTemplate<LeaveApplicationAttributes>) item;
                    //Log.d("StaffLeaveAttributes",s.toString());
                    data.add(datumTemplate.getAttributes());
                });
                leaveAdapter.setData(data, (HomeActivity) getActivity(),Common.STATUS_PENDING);
                //total page
                //lastPage=res.getMeta().getLastPage();
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call, Throwable t) {
                Log.d("onFailure",t.getMessage());
            }
        });
    }

    FragmentLeaveApplicationBinding fragmentLeaveApplicationBinding;
    LeaveApplicationAdapter leaveAdapter;
    int currentPage=1;
    boolean isLoading = false;
    int lastPage=1;
    boolean submited=false;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        fragmentLeaveApplicationBinding=FragmentLeaveApplicationBinding.inflate(inflater);
        leaveAdapter=new LeaveApplicationAdapter();
        DividerItemDecoration dividerItemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        fragmentLeaveApplicationBinding.rcvLeave.setAdapter(leaveAdapter);
        leaveAdapter.setData(data, (HomeActivity) getActivity(),Common.STATUS_PENDING);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        fragmentLeaveApplicationBinding.rcvLeave.setLayoutManager(linearLayoutManager);
        fragmentLeaveApplicationBinding.rcvLeave.addItemDecoration(dividerItemDecoration);
        //initScrollListener();
        //init dropdown option
        String[] options=new String[]{"Pending","Approve","Cancel"};
        ArrayAdapter<String> adapter=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, options);
        fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setAdapter(adapter);
        fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setFocusable(false);
        fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.showDropDown();
                return false;
            }
        });
        fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                Toast.makeText(getContext(), ""+charSequence, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
        fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                getLAByStatus(i);
            }
        });
        fragmentLeaveApplicationBinding.btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialog(view);
            }
        });
        getLAByStatus(0);
        return fragmentLeaveApplicationBinding.getRoot();
    }

    private void getLAByStatus(int i) {
        JSONObject object=new JSONObject();
        try {
            object.put("status",i);
            RequestBody requestBody=RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), object.toString());
            Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call = APIService.getService().getLeaveApByStatus(Common.getToken(),requestBody);
            call.enqueue(new Callback<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>>() {
                @Override
                public void onResponse(Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call, Response<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> response) {
                    if(response.isSuccessful()){
                        data=new ArrayList<>();
                        response.body().getData().forEach(item->{data.add(item.getAttributes());});
                        String type=Common.STATUS_PENDING;
                        if(i==1) type=Common.STATUS_APPROVED; else if(i==2) type=Common.STATUS_CANCLED;
                        leaveAdapter.setData(data, (HomeActivity) getActivity(),type);
                    }
                }

                @Override
                public void onFailure(Call<DataResponseList<DatumTemplate<LeaveApplicationAttributes>>> call, Throwable t) {

                }
            });
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

    }

    int leaveType;
    private void showDialog(View view) {
        AddLeaveDialogBinding binding = AddLeaveDialogBinding.inflate(LayoutInflater.from(view.getContext()));
        AddLeaveViewModel viewModel=new AddLeaveViewModel();
        binding.setAddLeaveViewModel(viewModel);
        AlertDialog alertDialog = new AlertDialog.Builder(view.getContext()).create();
        //alertDialog.setTitle("Add Department");
        alertDialog.setIcon(R.drawable.add);
        alertDialog.setCancelable(true);
//        alertDialog.setMessage("Your Message Here");
        Date date=new Date();
        final AutoCompleteTextView autoCompleteTextView = (AutoCompleteTextView) binding.AutoCompleteTextViewLeaveType;
      ArrayAdapter<String> adapter=new ArrayAdapter<>(view.getContext(), android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.leaveType));
      ImageView btn_close=binding.btnClose;
        autoCompleteTextView.setAdapter(adapter);
        autoCompleteTextView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                autoCompleteTextView.showDropDown();
                return false;
            }
        });
        autoCompleteTextView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                leaveType=i;
            }
        });
        btn_close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });
        final EditText edt_start_date = binding.idEdtStartDate;
        final EditText edt_due_day = binding.idEdtEndDate;
        final RadioButton radio1 = binding.radio1;
        final RadioButton radio2 =binding.radio2;
        final RadioGroup radioGroup =  binding.radiogroupNumdays;
        edt_start_date.setText("");
        Calendar calendar = Calendar.getInstance();
        edt_start_date.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        String date =  (++i1) +"-" +i2 + "-" + i;
                        edt_start_date.setText(date);
                    }
                }, LocalDate.now().getYear(),LocalDate.now().getMonth().getValue()-1,LocalDate.now().getDayOfMonth());

                datePickerDialog.getDatePicker().setMinDate(System.currentTimeMillis());
                datePickerDialog.show();
            }
        });
        edt_start_date.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                edt_due_day.setText("");
            }
        });
        Calendar calendar2 = Calendar.getInstance();
        edt_due_day.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int fromM,fromD,fromY;
                String dateFrom=edt_start_date.getText().toString();
                String[] tmp=dateFrom.split("-");
                fromM= Integer.parseInt(tmp[0]);
                fromD= Integer.parseInt(tmp[1]);
                fromY= Integer.parseInt(tmp[2]);
                DatePickerDialog datePickerDialog=new DatePickerDialog(view.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        String date =  (++i1) +"-" +i2 + "-" + i;
                        edt_due_day.setText(date);
                    }
                },fromY,fromM-1,fromD);

                calendar2.set(Calendar.SECOND, 0);
                calendar2.set(Calendar.MINUTE, 13);
                calendar2.set(Calendar.HOUR, 7);
                calendar2.set(Calendar.AM_PM, Calendar.AM);
                calendar2.set(Calendar.MONTH, fromM-1);
                calendar2.set(Calendar.DAY_OF_MONTH, fromD);
                calendar2.set(Calendar.YEAR, fromY);
                datePickerDialog.getDatePicker().setMinDate(calendar2.getTimeInMillis());
                Log.d("calendar", String.valueOf(calendar2.getTime()));
                datePickerDialog.show();
            }
        });
        edt_due_day.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void afterTextChanged(Editable editable) {
                //asign data to 2 radio button
                int fromM,fromD,fromY;
                int fromM2,fromD2,fromY2;
                String dateFrom=edt_start_date.getText().toString();
                if(dateFrom.equals("")) return;
                String[] tmp=dateFrom.split("-");
                fromM= Integer.parseInt(tmp[0]);
                fromD= Integer.parseInt(tmp[1]);
                fromY= Integer.parseInt(tmp[2]);
                String dateTo=edt_due_day.getText().toString();
                if(dateTo.equals("")) return;
                String[] tmp2=dateTo.split("-");
                fromM2= Integer.parseInt(tmp2[0]);
                fromD2= Integer.parseInt(tmp2[1]);
                fromY2= Integer.parseInt(tmp2[2]);
                Calendar calendar = Calendar.getInstance();
                calendar.set(Calendar.SECOND, 0);
                calendar.set(Calendar.MINUTE, 13);
                calendar.set(Calendar.HOUR, 7);
                calendar.set(Calendar.AM_PM, Calendar.AM);
                calendar.set(Calendar.MONTH, fromM-1);
                calendar.set(Calendar.DAY_OF_MONTH, fromD);
                calendar.set(Calendar.YEAR, fromY);
                viewModel.setCalendarStart(calendar);
                //
                Calendar calendar2 = Calendar.getInstance();
                calendar2.set(Calendar.SECOND, 0);
                calendar2.set(Calendar.MINUTE, 13);
                calendar2.set(Calendar.HOUR, 7);
                calendar2.set(Calendar.AM_PM, Calendar.AM);
                calendar2.set(Calendar.MONTH, fromM2-1);
                calendar2.set(Calendar.DAY_OF_MONTH, fromD2);
                calendar2.set(Calendar.YEAR, fromY2);
                viewModel.setCalendarEnd(calendar2);
                long dayDiff=TimeUnit.DAYS.convert(calendar2.getTimeInMillis()-calendar.getTimeInMillis(),TimeUnit.MILLISECONDS);
                Log.d("dayDiff", String.valueOf(dayDiff));
                if(dayDiff==0){
                    radio1.setText("0.5");
                    radio2.setText("1");
                } else if(dayDiff>=1){
                    radio1.setText(String.valueOf(dayDiff-1)+".5");
                    radio2.setText(String.valueOf(dayDiff));
                }
// Calculate the number of days between dates

            }
        });
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
                                        //txt_message.setText("Due Day greater than or equal to Start day");

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
        TextView txtSubmit=binding.txtSubmit;
        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //validate
                viewModel.setSubmited(true);

                if(radioGroup.getCheckedRadioButtonId()!=-1){
                    RadioButton radioButton=radioGroup.findViewById(radioGroup.getCheckedRadioButtonId());
                    viewModel.setNumberDay(radioButton.getText().toString());
                }
                if(viewModel.checkAll()){
                    //send api
                    JSONObject dataParent=new JSONObject();
                    JSONObject dataChild=new JSONObject();
                    try {
                        String startDate,endDate;
                        DateFormat simple = new SimpleDateFormat(
                                "yyyy-MM-dd");
                        startDate=simple.format(new Date(viewModel.getCalendarStart().getTimeInMillis()));
                        endDate=simple.format(new Date(viewModel.getCalendarEnd().getTimeInMillis()));
                        Log.d("startDate",startDate);
                        Log.d("startDate",endDate);

                        dataChild.put("description",viewModel.getReason());
                        dataChild.put("leave_type",leaveType);
                        dataChild.put("number_of_days_off",String.valueOf(viewModel.getNumberDay()));
                        dataChild.put("start_day",startDate);
                        dataChild.put("end_day",endDate);
                        dataParent.put("leave_application",dataChild);
                        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), dataParent.toString());
                        Call call= APIService.getServiceJson().addLeaveApplication(body,Common.getToken());
                        Response response=call.execute();
                        alertDialog.dismiss();
                        if(response.isSuccessful()){
                            ((HomeActivity)getActivity()).showToast(true,"Create Leave Application Success!");
                        } else {
                            ((HomeActivity)getActivity()).showToast(false,"Create Leave Application Failed!");
                        }
                    } catch (JSONException e) {
                        ((HomeActivity)getActivity()).showToast(false,"Create Leave Application Failed!");
                        throw new RuntimeException(e);
                    } catch (IOException e) {
                        ((HomeActivity)getActivity()).showToast(false,"Create Leave Application Failed!");
                        throw new RuntimeException(e);
                    }

                } else {
                    Log.d("startDate","not check");
                }
            }
        });
        alertDialog.setView(binding.getRoot());
        alertDialog.show();
    }

    private void initScrollListener() {
        fragmentLeaveApplicationBinding.rcvLeave.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(@NonNull RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
            }

            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);

                LinearLayoutManager linearLayoutManager = (LinearLayoutManager) recyclerView.getLayoutManager();

                if (!isLoading) {
                    if (linearLayoutManager != null && linearLayoutManager.findLastCompletelyVisibleItemPosition() == data.size() - 1&& (currentPage<lastPage))  {
                        //bottom of list!
                        loadMore(currentPage+1);
                        currentPage+=1;
                        isLoading = true;
                    }
                }
            }
        });

    }

    private void loadMore(int pageNum) {
//        Log.d("loadMore",String.valueOf(pageNum));
//        data.add(null);
//        leaveAdapter.notifyItemInserted(data.size() - 1);
//        Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call= APIService.getService().getLeaveByPageNum(Common.getToken(),pageNum);
//        call.enqueue(new Callback<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>>() {
//            @Override
//            public void onResponse(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Response<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> response) {
//                DataListHasMetaResponse res= response.body();
//                Log.d("onResponse","onResponse szie"+res.getData().size());
//                //
//                data.remove(data.size() - 1);
//                int scrollPosition = data.size();
//                leaveAdapter.notifyItemRemoved(scrollPosition);
//                //
//                res.getData().forEach(item->{
//                    DatumTemplate<StaffLeaveAttributes> datumTemplate= (DatumTemplate<StaffLeaveAttributes>) item;
//                    StaffLeaveAttributes s=new StaffLeaveAttributes(datumTemplate.getAttributes());
//                    //Log.d("StaffLeaveAttributes",s.toString());
//                    data.add(s);
//                });
//                leaveAdapter.notifyDataSetChanged();
//                isLoading = false;
//            }
//
//            @Override
//            public void onFailure(Call<DataListHasMetaResponse<DatumTemplate<StaffLeaveAttributes>>> call, Throwable t) {
//                Log.d("onFailure",t.getMessage());
//            }
//        });
    }
}