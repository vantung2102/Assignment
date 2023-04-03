package com.example.hrm;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.viewpager2.widget.ViewPager2;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.hrm.Adapters.StaffInfoAdapter;
import com.example.hrm.Response.Staff;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.databinding.DepartmentItemBinding;
import com.example.hrm.databinding.FragmentStaffInfoBinding;
import com.example.hrm.databinding.StaffInfoBinding;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link StaffInfoFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class StaffInfoFragment extends Fragment {
    public  static final String MY_TAG= "StaffInfoFragment";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public StaffInfoFragment() {
        // Required empty public constructor
    }
    private StaffAttributes staffAttributes;
    public StaffInfoFragment(StaffAttributes staffAttributes) {
        // Required empty public constructor
        this.staffAttributes=staffAttributes;
    }
    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment StaffInfoFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static StaffInfoFragment newInstance(String param1, String param2) {
        StaffInfoFragment fragment = new StaffInfoFragment();
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
    ViewPager2 viewPager2;
    StaffInfoAdapter staffInfoAdapter;
    View mView;
    TextView txtName,txtId;
    FragmentStaffInfoBinding fragmentStaffInfoBinding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        mView=inflater.inflate(R.layout.fragment_staff_info, container, false);
        txtName=mView.findViewById(R.id.txt_name);
        txtId=mView.findViewById(R.id.txt_staff_id);
        fragmentStaffInfoBinding=FragmentStaffInfoBinding.inflate(inflater);
        staffInfoAdapter=new StaffInfoAdapter(this,this.staffAttributes);
        fragmentStaffInfoBinding.pager.setAdapter(staffInfoAdapter);
        new TabLayoutMediator(fragmentStaffInfoBinding.tabLayout, fragmentStaffInfoBinding.pager,
                (tab, position) -> {
                    String str="";
                    switch (position){
                        case 0: str="Profile"; break;
                        case 1: str="TIME OFF"; break;
                        case 2: str="ONBOARDING"; break;
                        default: str="Profile"; break;
                    }
                    tab.setText(str);
                }
        ).attach();
        Log.d("staffAttributes",staffAttributes.toString());
        fragmentStaffInfoBinding.txtName.setText(staffAttributes.getFullname());
        fragmentStaffInfoBinding.txtStaffId.setText(staffAttributes.getId().toString());
        fragmentStaffInfoBinding.txtName.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getContext(), "cc", Toast.LENGTH_SHORT).show();
            }
        });
//        txtName.setText(staffAttributes.getFullname());
//        txtId.setText(staffAttributes.getId().stoString());
        //fragmentStaffInfoBinding.txtId.setText(staffAttributes.getFullname());
        return fragmentStaffInfoBinding.getRoot();
    }
}