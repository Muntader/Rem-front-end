<template>
  <div class="app-jobs-manage">
    <div class="app-jobs-manage__header">
      <div class="flex-1"></div>
      <div class="flex-2">
        <router-link
          :to="{name: 'jobs-create'}"
          type="button"
          class="btn btn-blue"
          v-tooltip.top-center="'Create new job'"
        >
          <span class="icon"></span>
        </router-link>
      </div>
    </div>

    <div class="app-jobs-manage__body">
      <div class="app-table">
        <table>
          <tr>
            <th>Name</th>
            <th>Server</th>
            <th>Input</th>
            <th>Output</th>
            <th>Status</th>
            <th>Template</th>
            <th></th>
          </tr>
          <tbody>
            <tr>
              <td>Teek</td>
              <td>OVH Ser1</td>
              <td>HleadOper-xa.mp4</td>
              <td>https://www.youtube.com/watch?v=Ulq_jb7MhT0&list=PLX2b6NDJzqg2hLos2TRN_ua-rhrDXLiVr&index=31</td>
              <td>Uploading</td>
              <td>HLS</td>
              <td>
                <div class="app-table-more dropdown">
                  <div class="icon" @click="ActiveOptionsDropdown = 1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 426.667 426.667"
                      style="enable-background:new 0 0 426.667 426.667;"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <circle cx="42.667" cy="213.333" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="213.333" cy="213.333" r="42.667" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle cx="384" cy="213.333" r="42.667" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <transition name="dropdown-ts">
                    <div class="menu dw-light" v-show="ActiveOptionsDropdown === 1">
                      <ul>
                        <li class="item">Server 2</li>
                        <li class="item">Server 2</li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="app-table-pagination">
        <div class="pagination-section">
          <div class="flex-1">
            <div class="paginaiton-records">
              <p>1 to 10 from 1000 records</p>
            </div>
          </div>
          <div class="flex-2">
            <div class="pagination-pages">
              <p>Page 2 from 10</p>
            </div>

            <ul class="pagination second">
              <li class="prev">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                    width="12px"
                    class
                  >
                    <g transform="matrix(-1 -1.22465e-16 1.22465e-16 -1 492.004 492.004)">
                      <g>
                        <g>
                          <path
                            d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                            data-original="#000000"
                            class="active-path"
                            fill="#000000"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
              <li class="next">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width="12px"
                    x="0px"
                    y="0px"
                    viewBox="0 0 492.004 492.004"
                    style="enable-background:new 0 0 492.004 492.004;"
                    xml:space="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      ActiveOptionsDropdown: 0
    };
  }
};
</script>
