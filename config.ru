require 'rack'

use Rack::Static, :urls => [""], root: '.', index: 'index.html'

run Rack

