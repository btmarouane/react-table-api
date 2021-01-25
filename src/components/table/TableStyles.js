import styled from 'styled-components'

export const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
    z-index: 2;
    .tr {
      width: auto;
      :last-child {
        .td {
          border-bottom: 0;
          width: auto;
        }
      }
    }
    .th,
    .td {
      font-size: 12px;
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
      :last-child {
        border-right: 0;
        width: auto;
      }
      width: auto;
    }
    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
      .body {
        position: relative;
        z-index: 0;
      }
      [data-sticky-td] {
        position: sticky;
        width: auto;
      }
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
        width: auto;
      }
      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
        width: auto;
      }
    }
  }
`
