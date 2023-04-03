package com.example.hrm;

import android.app.DatePickerDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
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
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Adapters.LeaveApplicationAdapter;
import com.example.hrm.Adapters.OnboardingSampleStepAdapter;
import com.example.hrm.Helpler.Helper;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.LeaveApplicationAttributes;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.OnboardingSampleStepAtrributes;
import com.example.hrm.Response.Position;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentOnboardingManagementBinding;
import com.example.hrm.viewmodel.AddOnboardingTaskViewModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link OnboardingSampleFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class OnboardingSampleFragment extends Fragment {
    public  static final String MY_TAG= "OnboardingSampleFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private boolean isPosistionLoaded=false;

    public OnboardingSampleFragment() {
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
    public static OnboardingSampleFragment newInstance(String param1, String param2) {
        OnboardingSampleFragment fragment = new OnboardingSampleFragment();
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
    List<OnboardingSampleStepAtrributes> data=new ArrayList<>();
    private void getData() {
        Call<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>> call= APIService.getService().getAllOnboardingSampleSteps(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>> call, Response<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>> response) {

                DataResponseList res= response.body();
                Log.d("onResponse","onResponse szie"+res.getData().size());
                res.getData().forEach(item->{
                    DatumTemplate<OnboardingSampleStepAtrributes> datumTemplate= (DatumTemplate<OnboardingSampleStepAtrributes>) item;
                    //Log.d("StaffLeaveAttributes",s.toString());
                    data.add(datumTemplate.getAttributes());
                });
                leaveAdapter.setData(data, (HomeActivity) getActivity());
                //total page
                //lastPage=res.getMeta().getLastPage();
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<OnboardingSampleStepAtrributes>>> call, Throwable t) {
                Log.d("onFailure",t.getMessage());
            }
        });
    }

    FragmentOnboardingManagementBinding fragmentLeaveApplicationBinding;
    OnboardingSampleStepAdapter leaveAdapter;
    int currentPage=1;
    boolean isLoading = false;
    int lastPage=1;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        fragmentLeaveApplicationBinding=FragmentOnboardingManagementBinding.inflate(inflater);
        leaveAdapter=new OnboardingSampleStepAdapter();
        DividerItemDecoration dividerItemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        fragmentLeaveApplicationBinding.rcvLeave.setAdapter(leaveAdapter);
        leaveAdapter.setData(data, (HomeActivity) getActivity());
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        fragmentLeaveApplicationBinding.rcvLeave.setLayoutManager(linearLayoutManager);
        fragmentLeaveApplicationBinding.rcvLeave.addItemDecoration(dividerItemDecoration);
        //initScrollListener();
        //init dropdown option
        leaveAdapter.setIOnClick(new IOnClick() {
            @Override
            public void showDialog(OnboardingSampleStepAtrributes onboardingSampleStepAtrributes, View view,int pos) {
                showDialogMain(onboardingSampleStepAtrributes,view,pos);
            }

            @Override
            public void showDialogDelete(OnboardingSampleStepAtrributes att, View view,int pos) {
                showDialogDeleteMain(att,view,pos);
            }
        });
        getAllPositions();
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
                if(charSequence.toString().length()==0){
                    leaveAdapter.showRawData();
                    return;
                }
                Helper.closeKeyboard(getActivity());
                //Toast.makeText(getContext(), ""+charSequence, Toast.LENGTH_SHORT).show();
                List<OnboardingSampleStepAtrributes> oldData = leaveAdapter.getData();
                List<OnboardingSampleStepAtrributes> newData = new ArrayList<>();
                oldData.forEach(item->{if(item.getPosition().getName().contains(charSequence.toString())){newData.add(item);};});
                leaveAdapter.showFilterData(newData);
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
        fragmentLeaveApplicationBinding.btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showDialogMain(null,view,-1);
            }
        });

        return fragmentLeaveApplicationBinding.getRoot();
    }

    private void showDialogDeleteMain(OnboardingSampleStepAtrributes att, View view,int pos) {
        AlertDialog alertDialog = new AlertDialog.Builder(view.getContext()).create();
        alertDialog.setTitle("Delete Onborading Step");
        String str="Are you sure delete '"+att.getTask()+"' ?";
        alertDialog.setMessage(str);
        alertDialog.setIcon(R.drawable.deletetrash);
        alertDialog.setCancelable(true);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                Call<ResponseBody> call = APIService.getService().deleteOnboardingTaskSample(Common.getToken(), att.getId());
                call.enqueue(new Callback<ResponseBody>() {
                    @Override
                    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                        alertDialog.dismiss();
                        if(response.isSuccessful()){
                            leaveAdapter.deleteItem(att,pos);
                            ((HomeActivity)getActivity()).showToast(true,"Delete Successfully!");
                        }
                        else {((HomeActivity)getActivity()).showToast(false,"Delete Failed!");
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseBody> call, Throwable t) {
                        ((HomeActivity)getActivity()).showToast(false,"Delete Failed!");
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

    List<Attributes> positions=new ArrayList<>();
    ArrayAdapter<String> adapterPositions;
    private void getAllPositions() {
        Call<DataResponseList<DatumTemplate<Attributes>>> call =APIService.getService().getAllPositions(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<Attributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<Attributes>>> call, Response<DataResponseList<DatumTemplate<Attributes>>> response) {
                //String[] options=new String[response.body().getData().size()];
                ArrayList<String> pName=new ArrayList<>();
                response.body().getData().forEach(item->{pName.add(item.getAttributes().getName());positions.add(item.getAttributes());});
                adapterPositions=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, pName);
                fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setAdapter(adapterPositions);
                isPosistionLoaded=true;
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<Attributes>>> call, Throwable t) {

            }
        });
    }
    interface DoAter{
        void updateViewData();
    }
    public interface  IOnClick{
        void showDialog(OnboardingSampleStepAtrributes onboardingSampleStepAtrributes,View view,int pos);

        void showDialogDelete(OnboardingSampleStepAtrributes att, View view,int pos);
    }
    int posId;
    private void showDialogMain(OnboardingSampleStepAtrributes onboardingSampleStepAtrributes,View view,int pos) {
        final View view2 = LayoutInflater.from(view.getContext()).inflate(R.layout.add_onboarding_ask_dialog, null);

        AlertDialog alertDialog = new AlertDialog.Builder(view.getContext()).create();

        ImageView close=view2.findViewById(R.id.btn_close);
        close.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.dismiss();
            }
        });//alertDialog.setTitle("Add Department");
        alertDialog.setIcon(R.drawable.add);
        alertDialog.setCancelable(true);
//        alertDialog.setMessage("Your Message Here");
        Date date=new Date();
        final AutoCompleteTextView autoCompleteTextView = (AutoCompleteTextView) view2.findViewById(R.id.AutoCompleteTextView);
        ArrayList<String> positionNames=new ArrayList<>();
        EditText edtTask=view2.findViewById(R.id.edtTask);
        EditText EdtDescription=view2.findViewById(R.id.EdtDescription);
        if(onboardingSampleStepAtrributes!=null){
            edtTask.setText(onboardingSampleStepAtrributes.getTask());
            EdtDescription.setText(onboardingSampleStepAtrributes.getDescription());
            autoCompleteTextView.setText(onboardingSampleStepAtrributes.getPosition().getName());
            posId=onboardingSampleStepAtrributes.getPosition().getId();
        }
        DoAter doAter=new DoAter() {
            @Override
            public void updateViewData() {
                autoCompleteTextView.setAdapter(adapterPositions);
            }
        };
        if(adapterPositions==null){
            getAllPositions(doAter);
        }
        positions.forEach(p->{positionNames.add(p.getName());});
        autoCompleteTextView.setAdapter(adapterPositions);
        autoCompleteTextView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                autoCompleteTextView.showDropDown();
                return false;
            }
        });

//
        TextView txtSubmit=view2.findViewById(R.id.txtSubmit);
        TextView txtErrorPosition=view2.findViewById(R.id.txt_mess_position);
        TextView txtErrorTask=view2.findViewById(R.id.txt_mess_task);
        TextView txtErrorDesciption=view2.findViewById(R.id.txt_mess_description);

        IDoSomeThing icIDoSomeThing=new IDoSomeThing() {
            @Override
            public void showErrorPosition(boolean show) {
                if(show) txtErrorPosition.setVisibility(View.VISIBLE);
                else txtErrorPosition.setVisibility(View.GONE);
            }

            @Override
            public void showErrorTask(boolean show) {
                if(show) txtErrorTask.setVisibility(View.VISIBLE);
                else txtErrorTask.setVisibility(View.GONE);
            }

            @Override
            public void showErrorDescription(boolean show) {
                if(show) txtErrorDesciption.setVisibility(View.VISIBLE);
                else txtErrorDesciption.setVisibility(View.GONE);
            }
        };
        final boolean[] submited = {false};
        txtSubmit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //validate
                String position =autoCompleteTextView.getText().toString();
                String task=edtTask.getText().toString().trim();
                String des=EdtDescription.getText().toString().trim();
                boolean isSend=true;
                if(!submited[0]){
                    submited[0] =!submited[0];
                }
                if(TextUtils.isEmpty(position)) {icIDoSomeThing.showErrorPosition(true);isSend=false;}
                if(TextUtils.isEmpty(task)) {icIDoSomeThing.showErrorTask(true);isSend=false;};
                if(TextUtils.isEmpty(des)) {icIDoSomeThing.showErrorDescription(true);isSend=false;};
                if(isSend){
                    JSONObject parent=new JSONObject();
                    JSONObject child=new JSONObject();
                    try {
                        child.put("description",des);
                        child.put("position_id",posId);
                        child.put("task",task);
                        parent.put("onboarding_sample_step",child);
                        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), parent.toString());
                        Call  call=null;
                        if(onboardingSampleStepAtrributes==null) {
                            call = APIService.getService().addOnboardingSampleSteps(Common.getToken(), body);
                            call.enqueue(new Callback<DataResponse<DatumTemplate<OnboardingSampleStepAtrributes>>>() {
                                @Override
                                public void onResponse(Call<DataResponse<DatumTemplate<OnboardingSampleStepAtrributes>>> call, Response<DataResponse<DatumTemplate<OnboardingSampleStepAtrributes>>> response) {
                                    alertDialog.dismiss();
                                    if(response.isSuccessful()){
                                        data.add(0,response.body().getData().getAttributes());
                                        leaveAdapter.notifyDataSetChanged();

                                        ((HomeActivity)getActivity()).showToast(true,"Create Successfully!");
                                    } else ((HomeActivity)getActivity()).showToast(false,"Create failed!");
                                }

                                @Override
                                public void onFailure(Call<DataResponse<DatumTemplate<OnboardingSampleStepAtrributes>>> call, Throwable t) {
                                    ((HomeActivity)getActivity()).showToast(false,"Create failed!");
                                }
                            });
                        }
                        else {
                            call = APIService.getService().updateOnboardingSampleSteps(Common.getToken(), onboardingSampleStepAtrributes.getId(), body);
                            call.enqueue(new Callback() {
                                @Override
                                public void onResponse(Call call, Response response) {
                                    if(response.isSuccessful()){
                                        Gson gson= (new GsonBuilder()).setPrettyPrinting().create();
                                        JsonParser parser = new JsonParser();
                                        JsonObject object = (JsonObject) parser.parse(response.body().toString());
                                        DatumTemplate<OnboardingSampleStepAtrributes> step = gson.fromJson(object.get("data"), new TypeToken<DatumTemplate<OnboardingSampleStepAtrributes>>() {}.getType());
                                        OnboardingSampleStepAtrributes att = step.getAttributes();
                                        data.set(pos,att);
                                        leaveAdapter.notifyItemChanged(pos);
                                        alertDialog.dismiss();
                                        ((HomeActivity)getActivity()).showToast(true,"Create Successfully!");
                                    }
                                }

                                @Override
                                public void onFailure(Call call, Throwable t) {
                                    ((HomeActivity)getActivity()).showToast(false,"Create failed!");
                                }
                            });
                        }

                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                    
                }
            }
        });
        edtTask.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if(submited[0]){
                    if(TextUtils.isEmpty(charSequence)){
                        icIDoSomeThing.showErrorTask(true);
                    } else icIDoSomeThing.showErrorTask(false);
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
        EdtDescription.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if(submited[0]){
                    if(TextUtils.isEmpty(charSequence)){
                        icIDoSomeThing.showErrorDescription(true);
                    } else icIDoSomeThing.showErrorDescription(false);
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
        autoCompleteTextView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if(submited[0]){
                    icIDoSomeThing.showErrorPosition(false);
                }
                posId=positions.get(i).getId();
            }
        });
        alertDialog.setView(view2);
        alertDialog.show();
    }




    public  interface IDoSomeThing{
        void showErrorPosition(boolean show);
        void showErrorTask(boolean show);
        void showErrorDescription(boolean show);
    }
    private void getAllPositions(DoAter doAter) {
        Call<DataResponseList<DatumTemplate<Attributes>>> call =APIService.getService().getAllPositions(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<Attributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<Attributes>>> call, Response<DataResponseList<DatumTemplate<Attributes>>> response) {
                //String[] options=new String[response.body().getData().size()];
                ArrayList<String> pName=new ArrayList<>();
                response.body().getData().forEach(item->{pName.add(item.getAttributes().getName());positions.add(item.getAttributes());});
                adapterPositions=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, pName);
                fragmentLeaveApplicationBinding.AutoCompleteTextViewSelectStatus.setAdapter(adapterPositions);
                isPosistionLoaded=true;
                doAter.updateViewData();
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<Attributes>>> call, Throwable t) {

            }
        });
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