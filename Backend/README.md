.
├── app
│   ├── channels
│   │   └── application_cable
│   │   ├── channel.rb
│   │   └── connection.rb
│   ├── controllers
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── authentication_controller.rb
│   │   │   └── v1
│   │   │   ├── base_controller.rb
│   │   │   ├── comments_controller.rb
│   │   │   ├── leave_management
│   │   │   │   ├── leave_applications_controller.rb
│   │   │   │   └── leaves_controller.rb
│   │   │   ├── onboarding_management
│   │   │   │   ├── onboarding_sample_steps_controller.rb
│   │   │   │   ├── onboarding_steps_controller.rb
│   │   │   │   └── staff_onboardings_controller.rb
│   │   │   ├── performance_management
│   │   │   │   └── performance_appraisal_forms_controller.rb
│   │   │   ├── property_management
│   │   │   │   ├── group_properties_controller.rb
│   │   │   │   ├── properties_controller.rb
│   │   │   │   └── property_providing_histories_controller.rb
│   │   │   ├── request_management
│   │   │   │   └── request_properties_controller.rb
│   │   │   └── staff_management
│   │   │   ├── departments_controller.rb
│   │   │   ├── job_titles_controller.rb
│   │   │   ├── positions_controller.rb
│   │   │   ├── staff_contracts_controller.rb
│   │   │   └── staffs_controller.rb
│   │   ├── application_controller.rb
│   │   └── concerns
│   │   ├── json_api_render.rb
│   │   ├── jwt_token.rb
│   │   └── pagination.rb
│   ├── helpers
│   ├── jobs
│   │   └── application_job.rb
│   ├── mailers
│   │   ├── application_mailer.rb
│   │   └── performance_appraisal_form_mailer.rb
│   ├── models
│   │   ├── application_record.rb
│   │   ├── comment.rb
│   │   ├── concerns
│   │   │   └── filterable.rb
│   │   ├── department.rb
│   │   ├── group_property.rb
│   │   ├── job_title.rb
│   │   ├── leave_application.rb
│   │   ├── leave.rb
│   │   ├── onboarding_sample_step.rb
│   │   ├── onboarding_step.rb
│   │   ├── performance_appraisal_form.rb
│   │   ├── position.rb
│   │   ├── property_providing_history.rb
│   │   ├── property.rb
│   │   ├── request_property.rb
│   │   ├── role.rb
│   │   ├── staff_contract.rb
│   │   ├── staff_onboarding.rb
│   │   └── staff.rb
│   ├── policies
│   │   ├── application_policy.rb
│   │   ├── department_policy.rb
│   │   ├── group_property_policy.rb
│   │   ├── job_title_policy.rb
│   │   ├── leave_application_policy.rb
│   │   ├── leave_policy.rb
│   │   ├── onboarding_sample_step_policy.rb
│   │   ├── onboarding_step_policy.rb
│   │   ├── performance_appraisal_form_policy.rb
│   │   ├── position_policy.rb
│   │   ├── property_policy.rb
│   │   ├── property_providing_history_policy.rb
│   │   ├── request_property_policy.rb
│   │   ├── staff_contract_policy.rb
│   │   ├── staff_onboarding_policy.rb
│   │   └── staff_policy.rb
│   ├── serializers
│   │   ├── base_serializer.rb
│   │   ├── comment_serializer.rb
│   │   ├── department_serializer.rb
│   │   ├── group_property_serializer.rb
│   │   ├── job_title_serializer.rb
│   │   ├── leave_application_serializer.rb
│   │   ├── leave_serializer.rb
│   │   ├── onboarding_sample_step_serializer.rb
│   │   ├── onboarding_step_serializer.rb
│   │   ├── performance_appraisal_form_serializer.rb
│   │   ├── position_serializer.rb
│   │   ├── property_providing_history_serializer.rb
│   │   ├── property_serializer.rb
│   │   ├── request_property_serializer.rb
│   │   ├── staff_contract_serializer.rb
│   │   ├── staff_onboarding_serializer.rb
│   │   └── staff_serializer.rb
│   ├── services
│   │   ├── application_service.rb
│   │   ├── leaves
│   │   │   ├── create_leave_application_service.rb
│   │   │   ├── create_leave_service.rb
│   │   │   └── respond_to_leave_application_service.rb
│   │   └── onboarding
│   │   └── create_onboarding_service.rb
│   ├── views
│   │   ├── layouts
│   │   │   ├── mailer.html.erb
│   │   │   └── mailer.text.erb
│   │   └── performance_appraisal_form_mailer
│   │   └── remind.slim
│   └── workers
│   ├── base_worker.rb
│   ├── create_all_performance_appraisal_form_worker.rb
│   └── remind_all_performance_appraisal_form_worker.rb
├── bin
│   ├── bundle
│   ├── rails
│   ├── rake
│   ├── setup
│   └── spring
├── config
│   ├── application.rb
│   ├── boot.rb
│   ├── cable.yml
│   ├── credentials.yml.enc
│   ├── database.yml
│   ├── environment.rb
│   ├── environments
│   │   ├── development.rb
│   │   ├── production.rb
│   │   └── test.rb
│   ├── initializers
│   │   ├── application_controller_renderer.rb
│   │   ├── backtrace_silencers.rb
│   │   ├── cors.rb
│   │   ├── filter_parameter_logging.rb
│   │   ├── inflections.rb
│   │   ├── jsonapi.rb
│   │   ├── mime_types.rb
│   │   ├── pagy.rb
│   │   ├── rolify.rb
│   │   ├── sidekiq.rb
│   │   └── wrap_parameters.rb
│   ├── locales
│   │   └── en.yml
│   ├── master.key
│   ├── puma.rb
│   ├── routes.rb
│   ├── sidekiq.yml
│   ├── spring.rb
│   └── storage.yml
├── config.ru
├── coverage
│   ├── assets
├── db
│   ├── migrate
│   │   ├── 20221124074755_create_department.rb
│   │   ├── 20221124075027_create_position.rb
│   │   ├── 20221124090118_create_staff.rb
│   │   ├── 20221125093552_add_boss_for_staff.rb
│   │   ├── 20221129103452_create_group_assets.rb
│   │   ├── 20221129104027_rolify_create_roles.rb
│   │   ├── 20221130025454_create_asset.rb
│   │   ├── 20221130025544_create_provide_asset.rb
│   │   ├── 20221130074810_change_staff.rb
│   │   ├── 20221201020759_create_request_property.rb
│   │   ├── 20221201023945_create_comment.rb
│   │   ├── 20221202080951_create_furlough.rb
│   │   ├── 20221202082017_create_furlough_detail.rb
│   │   ├── 20221206103638_create_staff_onboarding.rb
│   │   ├── 20221206103645_create_onboarding_sample_steps.rb
│   │   ├── 20221207065122_create_onboarding_steps.rb
│   │   ├── 20221208021558_add_deleted_at_to_staff.rb
│   │   ├── 20221208030303_create_job_title.rb
│   │   ├── 20221208080911_create_staff_contracts.rb
│   │   ├── 20221209080318_create_pa_form.rb
│   │   ├── 20221227051607_add_group_property_in_request_property.rb
│   │   └── 20230107185350_add_phone_and_address_to_staff.rb
│   ├── schema.rb
│   └── seeds.rb
├── dump.rdb
├── Gemfile
├── Gemfile.lock
├── lib
├── log
├── public
├── Rakefile
├── README.md
├── spec
│   ├── controllers
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── authentication_controller_spec.rb
│   │   │   └── v1
│   │   │   ├── comments_controller_rspec.rb
│   │   │   ├── leave_management
│   │   │   │   ├── leave_applications_controller_spec.rb
│   │   │   │   └── leaves_controller_spec.rb
│   │   │   ├── onboarding_management
│   │   │   │   ├── onboarding_sample_steps_controller_spec.rb
│   │   │   │   ├── onboarding_steps_controller_spec.rb
│   │   │   │   └── staff_onboardings_controller_spec.rb
│   │   │   ├── property_management
│   │   │   │   ├── group_properties_controller_spec.rb
│   │   │   │   ├── properties_controller_spec.rb
│   │   │   │   └── property_providing_histories_controller_spec.rb
│   │   │   ├── request_management
│   │   │   │   └── request_properties_controller_spec.rb
│   │   │   └── staff_management
│   │   │   ├── departments_controller_spec.rb
│   │   │   ├── job_titles_controller_spec.rb
│   │   │   ├── positions_controller_spec.rb
│   │   │   └── staffs_controller_spec.rb
│   │   └── application_controller_spec.rb
│   ├── factories
│   │   ├── comments.rb
│   │   ├── departments.rb
│   │   ├── group_properties.rb
│   │   ├── job_titles.rb
│   │   ├── leave_applications.rb
│   │   ├── leaves.rb
│   │   ├── onboarding_sample_steps.rb
│   │   ├── onboarding_steps.rb
│   │   ├── performance_appraisal_forms.rb
│   │   ├── positions.rb
│   │   ├── properties.rb
│   │   ├── property_providing_histories.rb
│   │   ├── request_properties.rb
│   │   ├── roles.rb
│   │   ├── staff_onboardings.rb
│   │   └── staffs.rb
│   ├── models
│   │   ├── comment_spec.rb
│   │   ├── department_spec.rb
│   │   ├── group_property_spec.rb
│   │   ├── job_title_spec.rb
│   │   ├── leave_application_spec.rb
│   │   ├── leave_spec.rb
│   │   ├── onboarding_sample_step_spec.rb
│   │   ├── onboarding_step_spec.rb
│   │   ├── performance_appraisal_form_spec.rb
│   │   ├── position_spec.rb
│   │   ├── property_providing_history_spec.rb
│   │   ├── property_spec.rb
│   │   ├── request_property_spec.rb
│   │   ├── role_spec.rb
│   │   ├── staff_onboarding_spec.rb
│   │   └── staff_spec.rb
│   ├── policies
│   │   ├── department_policy_spec.rb
│   │   ├── group_property_policy_spec.rb
│   │   ├── job_title_policy_spec.rb
│   │   ├── leave_application_policy_spec.rb
│   │   ├── leave_policy_rspec.rb
│   │   ├── onboarding_sample_step_policy_spec.rb
│   │   ├── onboarding_step_policy_spec.rb
│   │   ├── performance_appraisal_form_policy_spec.rb
│   │   ├── position_policy_spec.rb
│   │   ├── property_policy_spec.rb
│   │   ├── property_providing_history_policy_spec.rb
│   │   ├── request_property_policy_spec.rb
│   │   ├── staff_onboarding_policy_spec.rb
│   │   └── staff_policy_spec.rb
│   ├── rails_helper.rb
│   ├── serializers
│   │   ├── comment_serializer_spec.rb
│   │   ├── department_serializer_spec.rb
│   │   ├── group_property_serializer_spec.rb
│   │   ├── job_title_serializer_spec.rb
│   │   ├── leave_application_serializer_spec.rb
│   │   ├── leave_serializer_spec.rb
│   │   ├── onboarding_sample_step_serializer_spec.rb
│   │   ├── onboarding_step_serializer_spec.rb
│   │   ├── performance_appraisal_form_serializer_spec.rb
│   │   ├── position_serializer_spec.rb
│   │   ├── property_providing_history_serializer_spec.rb
│   │   ├── property_serializer_spec.rb
│   │   ├── request_property_serializer_spec.rb
│   │   ├── staff_onboarding_serializer_spec.rb
│   │   └── staff_serializer_spec.rb
│   ├── services
│   │   ├── leaves
│   │   │   ├── create_leave_application_spec.rb
│   │   │   ├── create_leave_spec.rb
│   │   │   └── respond_to_leave_application_spec.rb
│   │   └── onboarding
│   │   └── create_onboarding_spec.rb
│   ├── spec_helper.rb
│   └── support
│   ├── controller_helper.rb.rb
│   ├── database_cleaner.rb
│   ├── factory_bot.rb
│   └── shared_examples
│   └── authenticate.rb
├── storage
├── test
