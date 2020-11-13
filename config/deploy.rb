lock "~> 3.14.1"

set :application, "rails_react_template"
set :repo_url, "git@github.com:alexeyds/rails_react_template.git"

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

append :linked_files, "config/application.yml"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "react_spa/node_modules"

set :puma_threads,    [4, 16]
set :puma_workers,    1
set :puma_preload_app, true
set :puma_init_active_record, true
set :puma_restart_command, "bundle exec --keep-file-descriptors puma"

set :rvm_ruby_version, -> { "#{`cat .ruby-version`.strip}@#{fetch(:application)}" }

set :nvm_node, -> { "#{`cat ./react_spa/.nvmrc`.strip}" }

after 'deploy:updated', 'deploy:build_react_spa'
