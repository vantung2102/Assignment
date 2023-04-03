package com.example.hrm;

import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.hrm.Adapters.UserAdapter;
import com.example.hrm.Response.Attributes;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DataStaff;
import com.example.hrm.Response.DatumStaff;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.JobTitle;
import com.example.hrm.Response.Position;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link InactiveStaffFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class InactiveStaffFragment extends Fragment {
    public  static final String MY_TAG= "InactiveStaffFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public InactiveStaffFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment FirstFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static InactiveStaffFragment newInstance(String param1, String param2) {
        InactiveStaffFragment fragment = new InactiveStaffFragment();
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
    }
    private View mView;
    private RecyclerView rcvDes;
    private LinearLayout btn_add;
    private Button btnSearch;
    private EditText edtStaffName;
    UserAdapter userAdapter;
    private AutoCompleteTextView departments;
    private AutoCompleteTextView jobtitles;
    private AutoCompleteTextView positions;
    List<DatumTemplate<Attributes>> departmentsAtts,jobtitlesAtts,positionsAtts;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        mView=inflater.inflate(R.layout.fragment_inactive_staff, container, false);
        rcvDes=mView.findViewById(R.id.rcv_departments);
        userAdapter=new UserAdapter();
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        DividerItemDecoration dividerItemDecoration=new DividerItemDecoration(getContext(),DividerItemDecoration.VERTICAL);
        rcvDes.addItemDecoration(dividerItemDecoration);
        rcvDes.setAdapter(userAdapter);
        rcvDes.setLayoutManager(linearLayoutManager);
        getData();
        edtStaffName=mView.findViewById(R.id.edtStaffName);
        btnSearch=mView.findViewById(R.id.btn_search);
        btnSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String staffName=edtStaffName.getText().toString();
                if(!staffName.equals("")){
                    userAdapter.showLike(staffName);
                } else {
                    userAdapter.showAll();
                }
            }
        });
        departments=mView.findViewById(R.id.edtDepartments);
        jobtitles=mView.findViewById(R.id.edtJobtitle);
        positions=mView.findViewById(R.id.edtPositions);
        return mView;
    }

    private void showFormAddDepartment() {
        final View view = LayoutInflater.from(getContext()).inflate(R.layout.test_dialog, null);
        AlertDialog alertDialog = new AlertDialog.Builder(getContext()).create();
        alertDialog.setTitle("Add Department");
        alertDialog.setIcon(R.drawable.add);
        alertDialog.setCancelable(true);
//        alertDialog.setMessage("Your Message Here");


        final EditText edt_name = (EditText) view.findViewById(R.id.edt_name);
        edt_name.setText("");
        final EditText edt_des = (EditText) view.findViewById(R.id.edt_des);
        edt_des.setText("");
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                String str=edt_name.getText().toString()+" "+edt_des.getText().toString();
                Toast.makeText(getContext(), str, Toast.LENGTH_SHORT).show();
            }
        });


        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });


        alertDialog.setView(view);
        alertDialog.show();
    }

    private void getData() {
        Call<DataResponseList<DatumTemplate<StaffAttributes>>> call=APIService.getService().getAllInactiveStaff(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<StaffAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<StaffAttributes>>> call, Response<DataResponseList<DatumTemplate<StaffAttributes>>> response) {
                Log.d("getData",response.toString());
                //departmentAdapter.setData(response.body());
                Log.d("getData", String.valueOf(response.body().getData().size()));
                DataResponseList<DatumTemplate<StaffAttributes>> dataResponseList= response.body();

                List<DatumStaff> list=new ArrayList<>();
                dataResponseList.getData().forEach(item->{
                    DatumStaff datumTemplate=new DatumStaff(item);
                    list.add(datumTemplate);
                });
                userAdapter.setData(list,getContext(),(HomeActivity) getActivity());
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<StaffAttributes>>> call, Throwable t) {
                Log.d("getData",t.getMessage());
            }
        });
        Call<DataResponseList<DatumTemplate<Attributes>>> call2=APIService.getService().getAllDepartments(Common.getToken());
        call2.enqueue(new Callback<DataResponseList<DatumTemplate<Attributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<Attributes>>> call, Response<DataResponseList<DatumTemplate<Attributes>>> response) {
                Log.d("getData",response.toString());
                //departmentAdapter.setData(response.body());
                Log.d("getData", String.valueOf(response.body().getData().size()));
                String[] departmentNames=new String[response.body().getData().size()];
                List<DatumTemplate<Attributes>> res= response.body().getData();
                ArrayAdapter<String> adapter=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, departmentNames);
                for(int i=0;i<res.size();i++){
                    departmentNames[i]=res.get(i).getAttributes().getName();
                }

                departments.setAdapter(adapter);
                departments.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent motionEvent) {
                        departments.showDropDown();
                        return false;
                    }
                });
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<Attributes>>> call, Throwable t) {
                Log.d("getData",t.getMessage());
            }
        });
        //
        Call<DataResponseList<DatumTemplate<Attributes>>> call3=APIService.getService().getAllJobTitles(Common.getToken());
        call3.enqueue(new Callback<DataResponseList<DatumTemplate<Attributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<Attributes>>> call, Response<DataResponseList<DatumTemplate<Attributes>>> response) {
                Log.d("getData",response.toString());
                //departmentAdapter.setData(response.body());
                Log.d("getData", String.valueOf(response.body().getData().size()));
                String[] departmentNames=new String[response.body().getData().size()];
                jobtitlesAtts= response.body().getData();
                ArrayAdapter<String> adapter=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, departmentNames);
                for(int i=0;i<jobtitlesAtts.size();i++){
                    departmentNames[i]=jobtitlesAtts.get(i).getAttributes().getTitle();
                }

                jobtitles.setAdapter(adapter);
                jobtitles.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent motionEvent) {
                        jobtitles.showDropDown();
                        return false;
                    }
                });
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<Attributes>>> call, Throwable t) {
                Log.d("getData",t.getMessage());
            }
        });
        Call<DataResponseList<DatumTemplate<Attributes>>> call4=APIService.getService().getAllPositions(Common.getToken());
        call4.enqueue(new Callback<DataResponseList<DatumTemplate<Attributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<Attributes>>> call, Response<DataResponseList<DatumTemplate<Attributes>>> response) {
                Log.d("getData",response.toString());
                //departmentAdapter.setData(response.body());
                Log.d("getData", String.valueOf(response.body().getData().size()));
                String[] departmentNames=new String[response.body().getData().size()];
                List<DatumTemplate<Attributes>> res= response.body().getData();
                ArrayAdapter<String> adapter=new ArrayAdapter<>(getContext(), android.R.layout.simple_list_item_1, departmentNames);
                for(int i=0;i<res.size();i++){
                    departmentNames[i]=res.get(i).getAttributes().getName();
                }

                positions.setAdapter(adapter);
                positions.setOnTouchListener(new View.OnTouchListener() {
                    @Override
                    public boolean onTouch(View view, MotionEvent motionEvent) {
                        positions.showDropDown();
                        return false;
                    }
                });
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<Attributes>>> call, Throwable t) {
                Log.d("getData",t.getMessage());
            }
        });
    }
}