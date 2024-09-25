<script>
  import {outsideClick, createFillAll, azColumn, fillArea} from './actions';

  export let data = [];
  export let selection = [];

  $: rLen = data.length;
  $: cLen = data[0].length;
  $: fillAll = createFillAll(rLen, cLen);
  $: selection = fillAll(false);

  var active = null;
  let isMouseDown = false;

  function mouseDown(event) {
    isMouseDown = true;
    const target = event.target;
    if (target.tagName !== 'TD') return;

    const rowI = target.parentNode.rowIndex - 1;
    const colI = target.cellIndex - 1;

    if (rowI === -1) {
      // click in corner
      if (colI === -1) {
        selection = fillAll(true);
        active = [0, 0];

      // click in column
      } else {
        if (event.shiftKey) {
          selection = fillAll(false);
          selection = fillArea(selection, [0, colI], [rLen - 1, active ? active[1] : colI], true);
          active = active ?? [0, colI];

        } else {
          if (!event.ctrlKey && !event.metaKey)
            selection = fillAll(false);
          selection = fillArea(selection, [0, colI], [rLen - 1, colI], true);
          active = [0, colI];
        }
      }

      // if row
    } else if (colI === -1) {
      if (event.shiftKey) {
          selection = fillAll(false);
          selection = fillArea(selection, [rowI, 0], [active ? active[0] : rowI, cLen - 1], true);
          active = active ?? [rowI, 0];

        } else {
          if (!event.ctrlKey && !event.metaKey)
            selection = fillAll(false);
          selection = fillArea(selection, [rowI, 0], [rowI, cLen - 1], true);
          active = [rowI, 0];
        }

      // if not service cell
    } else {
      if (event.ctrlKey || event.metaKey) {
        selection[rowI][colI] = !selection[rowI][colI];
        active = [rowI, colI];

      } else if (event.shiftKey) {
        selection = fillAll(false);
        selection = fillArea(selection, [rowI, colI], active, true);

      } else {
        selection = fillAll(false);
        selection[rowI][colI] = true;
        active = [rowI, colI];
      }
    }
  }

  function mouseUp() {
    isMouseDown = false;
  }

  function mouseOver(event) {
    if (!isMouseDown) return;
    console.log('OVER')
    const target = event.target;
    if (target.tagName !== 'TD') return;
    const rowI = target.parentNode.rowIndex - 1;
    const colI = target.cellIndex - 1;

    if (rowI === -1) {
      if (colI === -1)
        selection = fillAll(true);
      else
        selection = fillArea(fillAll(false), [0, colI], [rLen - 1, active ? active[1] : colI], true);
      
    } else if (colI === -1) {
      selection = fillArea(fillAll(false), [active[0], 0], [rowI, cLen - 1], true);

      
    } else {
      selection = fillArea(fillAll(false), [rowI, colI], active, true);
    }
  }

</script>

<!-- {JSON.stringify(data)} -->

<table
use:outsideClick={() => {
  // selection = fillAll(false);
  // active = null;
}}

on:mousedown={mouseDown}
on:mouseup={mouseUp}
on:mouseover={mouseOver}
>
  <tr>
    <td></td>
    {#each data[0] as _, i}
      <td>{azColumn(i)}</td>
    {/each}
  </tr>
  {#each data as row, r}
    <tr>
      <td>{r + 1}</td>
      {#each row as cell, c}
        <td
        class:active={active &&active[0] === r && active[1] === c}
        class:selected={selection[r][c]}
        >{cell}</td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    border-collapse: collapse;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  td {
    border: 1px solid #ccc;
    padding: .2em;
  }

  td.selected {
    background-color: #c2dbfa;
  }

  td.active {
    box-shadow:  inset 0 0 0 1px blue;
  }
</style>
