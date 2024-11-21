import loading from './loading'
import clickOutside from './click-outside'
import copy from './copy'
import debounce from './debounce'
import lazyLoad from './lazy-load'
import permission from './permission'

export default {
  install(app) {
    app.directive('loading', loading)
    app.directive('click-outside', clickOutside)
    app.directive('copy', copy)
    app.directive('debounce', debounce)
    app.directive('lazy', lazyLoad)
    app.directive('permission', permission)
  }
}
