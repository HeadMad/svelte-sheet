<script>
  import {outsideClick, createFillAll, azColumn, fillArea} from './actions';
  export let data = [];

  $: fillAll = createFillAll(data.length, data[0].length);
  $: selection = fillAll(false);

  var active = false;

  function tableClick(event) {
    const target = event.target;
    if (target.tagName !== 'TD') return;

    const rInd = target.parentNode.rowIndex - 1;
    const cInd = target.cellIndex - 1;

    if (rInd === -1) {
      if (cInd === -1) {
        selection = fillAll(true);
        active = [0, 0];
      } else {
        selection = fillAll(false);
        selection.forEach(row => row[cInd] = true);
        active = [0, cInd];
      }

    } else if (cInd === -1) {
      selection = fillAll(false);
      selection[rInd].forEach((_, c, row) => row[c] = true);
      active = [rInd, 0];

    }



  }

</script>

<!-- {JSON.stringify(data)} -->

<table
use:outsideClick={() => {
  selection = fillAll(false);
  active = false;
}}
on:click={tableClick}
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
    padding: .5em 1em;
  }

  td.selected {
    background-color: #e6eef8;
  }

  td.active {
    outline: 2px solid blue;
  }
</style>
