package com.example.hrm;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.hrm.Response.PerformanceAttributes;
import com.example.hrm.databinding.FragmentSelfPreviewDetailBinding;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link SelfPreviewDetail#newInstance} factory method to
 * create an instance of this fragment.
 */
public class SelfPreviewDetail extends Fragment {
    public  static final String MY_TAG= "SelfPreviewDetail";
    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public SelfPreviewDetail() {
        // Required empty public constructor
    }
    private PerformanceAttributes att;
    public SelfPreviewDetail(PerformanceAttributes att) {
    this.att=att;
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment SelfPreviewDetail.
     */
    // TODO: Rename and change types and number of parameters
    public static SelfPreviewDetail newInstance(String param1, String param2) {
        SelfPreviewDetail fragment = new SelfPreviewDetail();
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
    FragmentSelfPreviewDetailBinding binding;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        binding=FragmentSelfPreviewDetailBinding.inflate(inflater);
        binding.seflPreviewQ1.setText(att.getGoalsSetStaff());
        if(att.getGoalsSetBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getGoalsSetBoss().toString());
        binding.seflPreviewQ2.setText(att.getAchievementStaff());
        if(att.getAchievementBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getAchievementBoss().toString());
        binding.seflPreviewQ3.setText(att.getGoalsWithCompanyStaff());
        if(att.getGoalsWithCompanyBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getGoalsWithCompanyBoss().toString());
        binding.seflPreviewQ4.setText(att.getChallengingStaff());
        if(att.getChallengingBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getChallengingBoss().toString());
        binding.seflPreviewQ5.setText(att.getLeastEnjoyStaff());
        if(att.getLeastEnjoyBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getLeastEnjoyBoss().toString());
        binding.seflPreviewQ6.setText(att.getContributeStaff());
        if(att.getContributeBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getContributeBoss().toString());
        binding.seflPreviewQ7.setText(att.getCurrentJobStaff());
        if(att.getCurrentJobBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getCurrentJobBoss().toString());
        binding.seflPreviewQ8.setText(att.getImprovementStaff());
        if(att.getImprovementBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getImprovementBoss().toString());
        binding.seflPreviewQ9.setText(att.getObstructingStaff());
        if(att.getObstructingBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getObstructingBoss().toString());
        binding.seflPreviewQ10.setText(att.getFeedbackStaff());
        if(att.getFeedbackBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getFeedbackBoss().toString());
        binding.seflPreviewQOthers.setText(att.getDescriptionStaff());
        if(att.getDescriptionBoss()!=null) binding.seflPreviewQ1Reviewer.setText(att.getDescriptionBoss().toString());
        return binding.getRoot();
    }
}