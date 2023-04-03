package com.example.hrm;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataStaff;
import com.example.hrm.Response.DatumStaff;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;
import com.example.hrm.databinding.FragmentStaffProfileBinding;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link StaffProfileFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class StaffProfileFragment extends Fragment {
    public  static final String MY_TAG= "StaffProfileFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public StaffProfileFragment() {
        // Required empty public constructor
    }
    private  StaffAttributes staffAttributes;
    public StaffProfileFragment(StaffAttributes staffAttributes) {
    this.staffAttributes=staffAttributes;
    getStaffById(staffAttributes.getId());
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
    public static StaffProfileFragment newInstance(String param1, String param2) {
        StaffProfileFragment fragment = new StaffProfileFragment();
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

    private void getStaffById(Integer id) {
        Call<DataResponse<DatumStaff>> call=APIService.getService().fetchProfileRaw(id,Common.getToken());
        call.enqueue(new Callback<DataResponse<DatumStaff>>() {
            @Override
            public void onResponse(Call<DataResponse<DatumStaff>> call, Response<DataResponse<DatumStaff>> response) {
//                Log.d("getStaffById","ok");
//                Log.d("getStaffById",response.body().toString());
//                Log.d("getStaffById",.toString());
                staffAttributes=response.body().getData().getAttributes();
                updateView();
            }

            @Override
            public void onFailure(Call<DataResponse<DatumStaff>> call, Throwable t) {
                Log.d("getStaffById","onFailure");
                Log.d("getStaffById",t.getMessage());
            }
        });
    }

    private void updateView() {
        if(staffAttributes!=null){
            fragmentStaffProfileBinding.txtAddress.setText(staffAttributes.getAddress());
            fragmentStaffProfileBinding.txtFullname.setText(staffAttributes.getFullname());
            fragmentStaffProfileBinding.txtDayofbirth.setText(staffAttributes.getDateOfBirth()!=null?staffAttributes.getDateOfBirth().toString():"");
            fragmentStaffProfileBinding.txtEmail.setText(staffAttributes.getEmail());
            fragmentStaffProfileBinding.txtDepartment.setText(staffAttributes.getDepartment().getName());
            //fragmentStaffProfileBinding.txtCompanyemail.setText(staffAttributes.get());
            fragmentStaffProfileBinding.txtEnglistname.setText(staffAttributes.getFullname());

            fragmentStaffProfileBinding.txtPhone.setText(staffAttributes.getPhone());
            fragmentStaffProfileBinding.txtJobtitle.setText(staffAttributes.getJobTitle().getTitle());
            fragmentStaffProfileBinding.txtJoindate.setText(staffAttributes.getJoinDate()!=null?staffAttributes.getJoinDate().toString():"");
            //fragmentStaffProfileBinding.txtManager.setText();
        }
    }

    FragmentStaffProfileBinding fragmentStaffProfileBinding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        fragmentStaffProfileBinding=FragmentStaffProfileBinding.inflate(inflater);
        if(staffAttributes!=null){
            fragmentStaffProfileBinding.txtAddress.setText(staffAttributes.getAddress());
            fragmentStaffProfileBinding.txtFullname.setText(staffAttributes.getFullname());
            fragmentStaffProfileBinding.txtDayofbirth.setText(staffAttributes.getDateOfBirth()!=null?staffAttributes.getDateOfBirth().toString():"");
            fragmentStaffProfileBinding.txtEmail.setText(staffAttributes.getEmail());
            fragmentStaffProfileBinding.txtDepartment.setText(staffAttributes.getDepartment().getName());
            //fragmentStaffProfileBinding.txtCompanyemail.setText(staffAttributes.get());
            fragmentStaffProfileBinding.txtEnglistname.setText(staffAttributes.getFullname());

            fragmentStaffProfileBinding.txtPhone.setText(staffAttributes.getPhone());
            fragmentStaffProfileBinding.txtJobtitle.setText(staffAttributes.getJobTitle().getTitle());
            fragmentStaffProfileBinding.txtJoindate.setText(staffAttributes.getJoinDate()!=null?staffAttributes.getJoinDate().toString():"");
            //fragmentStaffProfileBinding.txtManager.setText();
        }

        return fragmentStaffProfileBinding.getRoot();
    }
}