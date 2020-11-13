namespace :deploy do
  desc 'Build react SPA'
  task :build_react_spa do
    on release_roles [:web, :app] do
      within File.join(release_path, '/react_spa') do
        with rails_env: fetch(:rails_env) do
          execute :yarn, 'install'
          execute :yarn, 'build'
        end
      end
    end
  end
end
