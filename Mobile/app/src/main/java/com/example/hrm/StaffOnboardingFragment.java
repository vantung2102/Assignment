package com.example.hrm;

import android.os.Bundle;
import android.util.ArrayMap;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;

import com.example.hrm.Adapters.StaffOnboardingAdapter;
import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumStaffLeave;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.OnboardingByStaffAttributes;
import com.example.hrm.Response.StaffLeaveAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentStaffOnboardingBinding;
import com.example.hrm.databinding.FragmentStaffTimeoffBinding;

import org.json.JSONObject;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link StaffOnboardingFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class StaffOnboardingFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    public  static final String MY_TAG= "StaffOnboardingFragment";
    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private  Integer id;
    public StaffOnboardingFragment(Integer id) {
        // Required empty public constructor
        this.id=id;
        getStaffOnboardingById(id);
    }

    private void getStaffOnboardingById(Integer id) {
        Map<String, Object> jsonParams = new ArrayMap<>();
        jsonParams.put("staff_id", id);
        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"), (new JSONObject(jsonParams)).toString());
        Call<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>> call = APIService.getService().getOnBoardingByStaff(body,Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>> call, Response<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>> response) {
                Log.d("getStaffById","onResponse");
                adapter.setData(response.body().getData());
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<OnboardingByStaffAttributes>>> call, Throwable t) {
                Log.d("getStaffById","onFailure");
                Log.d("getStaffById",t.getMessage());
            }
        });
    }

    public StaffOnboardingFragment() {
        // Required empty public constructor
    }
    StaffOnboardingAdapter adapter;
    private void getStaffTimeOffById(Integer id) {
        Map<String, Object> jsonParams = new ArrayMap<>();
//put something inside the map, could be null
        jsonParams.put("staff_id", id);

        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"),(new JSONObject(jsonParams)).toString());
        Call<DataResponse<DatumStaffLeave>> call= APIService.getService().getUser(body,Common.getToken());
        call.enqueue(new Callback<DataResponse<DatumStaffLeave>>() {
            @Override
            public void onResponse(Call<DataResponse<DatumStaffLeave>> call, Response<DataResponse<DatumStaffLeave>> response) {
                Log.d("getStaffById","onResponse");
//                StaffLeaveAttributes staffLeaveAttributes=response.body().getData().getAttributes();
//                fragmentStaffTimeoffBinding.txtName.setText(staffLeaveAttributes.getStaff().getFullname());
//                fragmentStaffTimeoffBinding.txtTotalCasualLeave.setText(staffLeaveAttributes.getAllowedNumberOfDaysOff().toString());
//                fragmentStaffTimeoffBinding.txtCasualLeave.setText(staffLeaveAttributes.getCasualLeave().toString());
//                fragmentStaffTimeoffBinding.txtUnpaid.setText(staffLeaveAttributes.getUnpaidLeave().toString());
//                fragmentStaffTimeoffBinding.txtMarriage.setText(staffLeaveAttributes.getMarriageLeave().toString());
//                fragmentStaffTimeoffBinding.txtCompassionate.setText(staffLeaveAttributes.getCompassionateLeave().toString());
//                fragmentStaffTimeoffBinding.txtPaternity.setText(staffLeaveAttributes.getPaternityLeave().toString());
//                fragmentStaffTimeoffBinding.txtMaternity.setText(staffLeaveAttributes.getMaternityLeave().toString());

            }

            @Override
            public void onFailure(Call<DataResponse<DatumStaffLeave>> call, Throwable t) {
                Log.d("getStaffById","onFailure");
                Log.d("getStaffById",t.getMessage());
            }
        });
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment StaffProfileFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static StaffOnboardingFragment newInstance(String param1, String param2) {
        StaffOnboardingFragment fragment = new StaffOnboardingFragment();
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
    FragmentStaffOnboardingBinding fragmentStaffOnboardingBinding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        fragmentStaffOnboardingBinding=FragmentStaffOnboardingBinding.inflate(inflater);
        adapter=new StaffOnboardingAdapter();
        fragmentStaffOnboardingBinding.rcvOnborading.setAdapter(adapter);
        LinearLayoutManager linearLayoutManager=new LinearLayoutManager(getContext());
        fragmentStaffOnboardingBinding.rcvOnborading.setLayoutManager(linearLayoutManager);
        return fragmentStaffOnboardingBinding.getRoot();
    }
}