<script>
  import { outsideClick } from "./actions";
  import { createFillAll, azColumn, fillArea } from "./utils";

  export let body = [];
  export let selection = [];
  export let active = null;

  var rLen, cLen, fillAll;

  $: if (body.length) {
    rLen = body.length;
    cLen = body[0].length;
    fillAll = createFillAll(rLen, cLen);
    selection = fillAll(false);
    active = null;
  }

  let isMouseDown = false;

  function mouseDown(event) {
    isMouseDown = true;
    const target = event.target;
    if (target.tagName !== "TD") return;

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
          selection = fillArea(
            selection,
            [0, colI],
            [rLen - 1, active ? active[1] : colI],
            true,
          );
          active = active ?? [0, colI];
        } else {
          if (!event.ctrlKey && !event.metaKey) selection = fillAll(false);
          selection = fillArea(selection, [0, colI], [rLen - 1, colI], true);
          active = [0, colI];
        }
      }

      // if row
    } else if (colI === -1) {
      if (event.shiftKey) {
        selection = fillAll(false);
        selection = fillArea(
          selection,
          [rowI, 0],
          [active ? active[0] : rowI, cLen - 1],
          true,
        );
        active = active ?? [rowI, 0];
      } else {
        if (!event.ctrlKey && !event.metaKey) selection = fillAll(false);
        selection = fillArea(selection, [rowI, 0], [rowI, cLen - 1], true);
        active = [rowI, 0];
      }

      // if not service cell
    } else {
      if (event.shiftKey) {
        selection = fillAll(false);
        selection = fillArea(selection, [rowI, colI], active, true);
      } else if (event.ctrlKey || event.metaKey) {
        selection[rowI][colI] = !selection[rowI][colI];
        active = [rowI, colI];
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
    console.log("OVER");
    const target = event.target;
    if (target.tagName !== "TD") return;
    const rowI = target.parentNode.rowIndex - 1;
    const colI = target.cellIndex - 1;

    if (rowI === -1) {
      if (colI === -1) selection = fillAll(true);
      else
        selection = fillArea(
          fillAll(false),
          [0, colI],
          [rLen - 1, active ? active[1] : colI],
          true,
        );
    } else if (colI === -1) {
      selection = fillArea(
        fillAll(false),
        [active[0], 0],
        [rowI, cLen - 1],
        true,
      );
    } else {
      selection = fillArea(fillAll(false), [rowI, colI], active, true);
    }
  }
</script>

<!-- {JSON.stringify(body)} -->
<svelte:window on:mouseup={mouseUp} />

<table
  use:outsideClick={() => {
    // selection = fillAll(false);
    // active = null;
  }}
  on:mousedown={mouseDown}
  on:mouseover={mouseOver}
>
  <tr>
    <td align="right" valign="bottom">🡦</td>
    {#each body[0] as _, i}
      <td class:has-selection={selection.some((row) => row[i])}
        >{azColumn(i)}</td
      >
    {/each}
  </tr>
  {#each body as row, r}
    <tr>
      <td>{r + 1}</td>
      {#each row as cell, c}
        <td
          class:active={active && active[0] === r && active[1] === c}
          class:selected={selection[r][c]}>{cell}</td
        >
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

  td:first-child:has(~ .selected),
  .has-selection {
    background-color: #f0f7ff;
    outline: 1px solid #4d9dff;
  }

  td {
    border: 1px solid #cccccc;
    padding: 0.2em;
  }

  td.selected {
    background-color: #c2dbfa;
  }

  td.active {
    box-shadow: inset 0 0 0 1px blue;
  }
</style>
