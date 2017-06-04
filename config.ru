require 'rack'

use Rack::Static, :urls => [""], root: 'public', index: 'index.html'

run Rack

