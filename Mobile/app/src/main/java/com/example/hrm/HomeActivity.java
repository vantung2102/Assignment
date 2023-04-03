package com.example.hrm;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.util.Log;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.hrm.Response.DataResponse;
import com.example.hrm.Response.DataResponseList;
import com.example.hrm.Response.DatumTemplate;
import com.example.hrm.Response.StaffAttributes;
import com.example.hrm.Services.APIService;
import com.google.android.material.navigation.NavigationView;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeActivity extends AppCompatActivity {
    private DrawerLayout mDrawer;

    private Toolbar toolbar;

    private NavigationView nvDrawer;
    FragmentManager fragmentManager = getSupportFragmentManager();


    // Make sure to be using androidx.appcompat.app.ActionBarDrawerToggle version.

    ActionBarDrawerToggle actionBarDrawerToggle;
    TextView txtStaffname;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        txtStaffname=findViewById(R.id.txt_staff_name);
        toolbar = findViewById(R.id.toolbar);
        toolbar.setTitle("onCreate");
        //toshowHambugerIcon(toolbar);



        // to make the Navigation drawer icon always appear on the action bar

        setSupportActionBar(toolbar);

        // This will display an Up icon (<-), we will replace it with hamburger later


        // Find our drawer view

        mDrawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        nvDrawer = (NavigationView) findViewById(R.id.nvView);

        actionBarDrawerToggle = new ActionBarDrawerToggle(this, mDrawer, R.string.nav_open, R.string.nav_close);

        // pass the Open and Close toggle for the drawer layout listener
        // to toggle the button
        mDrawer.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setupDrawerContent();
        getAllStaff();
        Call<DataResponse<DatumTemplate<StaffAttributes>>> call = APIService.getService().getCurrentUser(Common.getToken());
        try {
            Response<DataResponse<DatumTemplate<StaffAttributes>>> res = call.execute();
            if(res.isSuccessful()){
                StaffAttributes staff=res.body().getData().getAttributes();
                View view=  nvDrawer.getHeaderView(0);
                TextView txtname=view.findViewById(R.id.txt_staff_name);
                TextView txtRole=view.findViewById(R.id.txt_staff_role);
                txtname.setText(staff.getFullname());

                if(staff.getRoles()!=null&&staff.getRoles().size()>0&&staff.getRoles().get(0).getName().equals(Common.MANAGER)){
                    Log.d("Login",Common.MANAGER);
                    txtRole.setText(Common.MANAGER);
                } else {
                    txtRole.setText(Common.STAFF);
                    Log.d("Login","!"+Common.MANAGER);
                    //hide fragment
                    nvDrawer.getMenu().findItem(R.id.StaffManagement).setVisible(false);

                    //all staff fragment
                    //onboarding
                    nvDrawer.getMenu().findItem(R.id.nav_onboarding_sample).setVisible(false);
                    //perfomance
                    nvDrawer.getMenu().findItem(R.id.nav_performance).setVisible(false);
                    //leave
                    nvDrawer.getMenu().findItem(R.id.nav_leave).setVisible(false);
                    //all property fragment
                    nvDrawer.getMenu().findItem(R.id.PropertyManagement).setVisible(false);
                }
                //set info user to drawer


            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        fragmentManager.addOnBackStackChangedListener(new FragmentManager.OnBackStackChangedListener() {
            @Override
            public void onBackStackChanged() {
                Log.d("onBackStackChanged","onBackStackChanged");
                getSupportActionBar().setTitle(fragmentManager.findFragmentById(R.id.flContent).getTag());
            }
        });
//
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        getSupportActionBar().setHomeButtonEnabled(true);
    }

    private void toshowHambugerIcon(Toolbar toolbar) {
        Drawable d=getResources().getDrawable(R.drawable.menu);
        Bitmap bitmap=((BitmapDrawable)d).getBitmap();
        Drawable newD=new BitmapDrawable(getResources(),Bitmap.createScaledBitmap(bitmap,20,20,true));
        toolbar.setNavigationIcon(newD);
    }

    public void addOrRemoveBackButton(boolean add){
        actionBarDrawerToggle.setDrawerIndicatorEnabled(!add);
        getSupportActionBar().setDisplayShowHomeEnabled(add);
    }
        private void getAllStaff() {
        Call<DataResponseList<DatumTemplate<StaffAttributes>>> call= APIService.getService().getAllStaff(Common.getToken());
        call.enqueue(new Callback<DataResponseList<DatumTemplate<StaffAttributes>>>() {
            @Override
            public void onResponse(Call<DataResponseList<DatumTemplate<StaffAttributes>>> call, Response<DataResponseList<DatumTemplate<StaffAttributes>>> response) {
                Log.d("getAllStaff","onResponse");
                List<StaffAttributes> staffAttributes=new ArrayList<>();

                DataResponseList<DatumTemplate<StaffAttributes>> res=response.body();
                String[] names=new String[res.getData().size()];
                for(int i=0;i<res.getData().size();i++){
                    StaffAttributes att=res.getData().get(i).getAttributes();
                    names[i]=att.getFullname();
                }
                Common.setStaffs(staffAttributes);
                Common.setStaffNames(names);
                Log.d("names",names[0]);
            }

            @Override
            public void onFailure(Call<DataResponseList<DatumTemplate<StaffAttributes>>> call, Throwable t) {
                Log.d("getAllStaff","onFailure");
            }
        });
    }

        private void setupDrawerContent( ) {
            nvDrawer.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                    if(item.getItemId()==R.id.nav_logout){
                        Toast.makeText(HomeActivity.this, "Log out", Toast.LENGTH_SHORT).show();
                    } else
                    selectDrawerItem(item);
                    return true;
                }
            });
        }
        public void selectDrawerItem(MenuItem menuItem) {
            // Create a new fragment and specify the fragment to show based on nav item clicked

            Fragment fragment = null;

            Class fragmentClass;
            String tag="";
            switch(menuItem.getItemId()) {

                case R.id.nav_department:

                    fragmentClass = DepartmentFragment.class;
                    tag=((DepartmentFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_jobtitle:

                    fragmentClass = JobTitleFragment.class;
                    tag=((JobTitleFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_position:

                    fragmentClass = PositionFragment.class;
                    tag=((PositionFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_staff:
                    fragmentClass = StaffFragment.class;
                    tag=((StaffFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_inactive_stafft:

                    fragmentClass = InactiveStaffFragment.class;
                    tag=((InactiveStaffFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_leave:

                    fragmentClass = LeaveFragment.class;
                    tag=((LeaveFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_leave_applications:

                    fragmentClass = LeaveApplicationFragment.class;
                    tag=((LeaveApplicationFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_onboarding_sample:

                    fragmentClass = OnboardingSampleFragment.class;
                    tag=((OnboardingSampleFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_performance:

                    fragmentClass = PerformanceFragment.class;
                    tag=((PerformanceFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_properties_group:

                    fragmentClass = PropertiesGroupFragment.class;
                    tag=((PropertiesGroupFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_properties:

                    fragmentClass = PropertiesFragment.class;
                    tag=((PropertiesFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_providing_histories:

                    fragmentClass = ProvidingHistoryFragment.class;
                    tag=((ProvidingHistoryFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_self_preview:

                    fragmentClass = SelfPreviewFragment.class;
                    tag=((SelfPreviewFragment) fragment).MY_TAG;
                    break;
                case R.id.nav_request_properties:

                    fragmentClass = RequestPropertyFragment.class;
                    tag=((RequestPropertyFragment) fragment).MY_TAG;
                    break;
                    default:

                    fragmentClass = DepartmentFragment.class;
                    tag=((DepartmentFragment) fragment).MY_TAG;

            }



            try {

                fragment = (Fragment) fragmentClass.newInstance();
            } catch (Exception e) {

                e.printStackTrace();

            }



            // Insert the fragment by replacing any existing fragment


            Log.d("addtoBack",tag);
            fragmentManager.beginTransaction().addToBackStack(tag).replace(R.id.flContent, fragment, tag).commit();
            Common.CURRENT_FRAGMENT_TAG=tag;


            // Highlight the selected item has been done by NavigationView

            menuItem.setChecked(true);

            // Set action bar title
            getSupportActionBar().setTitle(menuItem.getTitle());

            // Close the navigation drawer

            mDrawer.closeDrawers();

        }
        @Override

    public boolean onOptionsItemSelected(MenuItem item) {

        // The action bar home/up action should open or close the drawer.

        switch (item.getItemId()) {

            case android.R.id.home:
                if(actionBarDrawerToggle.isDrawerIndicatorEnabled()){
                    mDrawer.openDrawer(GravityCompat.START);
                } else onBackPressed();


                return true;

        }



        return super.onOptionsItemSelected(item);

    }
    public void showToast(boolean success,String mess){
        Log.d("showToast",mess);
        View toast=null;
        if(success) {
            toast=getLayoutInflater().inflate(R.layout.toast_success,null,false);
        }
        else {
            toast=getLayoutInflater().inflate(R.layout.toast_failed,null,false);
        }
        toast.setId(Integer.parseInt("06901"));
        TextView txteMess=toast.findViewById(R.id.txtMess);
        txteMess.setText(mess);
        FrameLayout.LayoutParams layoutParams = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        layoutParams.gravity= Gravity.BOTTOM;
        toast.setLayoutParams(layoutParams);
        FrameLayout fl=findViewById(R.id.flContent);
        fl.addView(toast);
        Handler handler=new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                fl.removeView(fl.findViewById(Integer.parseInt("06901")));
            }
        },5000);
    }
    public void relaceFragment(Fragment fragment) {
        String tag=fragment.getArguments().getString("TAG");
        getSupportActionBar().setTitle(tag);
        Log.d("tag",tag);
        Log.d("tag","CURRENT_FRAGMENT_TAG: "+Common.CURRENT_FRAGMENT_TAG);
        Log.d("tag","NEW_TAG: "+tag);
        Fragment currentFragment = fragmentManager.findFragmentById(R.id.flContent);

        //Prevent adding same fragment on top
        if (currentFragment.getClass() == fragment.getClass()) {
            return;
        }

        //If fragment is already on stack, we can pop back stack to prevent stack infinite growth
        if (fragmentManager.findFragmentByTag(tag) != null) {
            Log.d("tag","find tag: not null : "+tag);
            fragmentManager.popBackStack(tag, FragmentManager.POP_BACK_STACK_INCLUSIVE);
        } else {
            Log.d("tag","find tag: null: "+tag);
            Log.d("tag","Add to back stack: "+tag);
            //Otherwise, just replace fragment
            fragmentManager
                    .beginTransaction()
                    .addToBackStack(tag)
                    .replace(R.id.flContent, fragment, tag)
                    .commit();
        }
        Common.CURRENT_FRAGMENT_TAG=tag;

    }

    @Override
    public void onBackPressed() {
        int fragmentsInStack =fragmentManager.getBackStackEntryCount();
        Log.d("onBackPressed","onBackPressed");
        Log.d("fragmentsInStack", String.valueOf(fragmentsInStack));
        if (fragmentsInStack > 1) { // If we have more than one fragment, pop back stack
            //fragmentManager.popBackStack();
            if(fragmentsInStack==2){
                addOrRemoveBackButton(false);
            }
            Log.d("fragmentsInStack tag", fragmentManager.findFragmentById(R.id.flContent).getTag());
            fragmentManager.popBackStack();
            Log.d("fragmentsInStack tag B", fragmentManager.findFragmentById(R.id.flContent).getTag());


        } else if (fragmentsInStack == 1) { // Finish activity, if only one fragment left, to prevent leaving empty screen
            finish();
        } else {
            super.onBackPressed();
        }
    }
    @Override
    protected void onResume() {
        Log.d("Home","onResume");
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        Log.d("Home","onDestroy");
        super.onDestroy();
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d("Home","onPause");
    }
}