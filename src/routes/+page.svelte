<script>
  import {Sheet} from '$lib';

  var cars = [
  ["Brand", "Model", "Year", "Color", "Date Added"],
  ["Toyota", "Camry", 2020, "Red", "2023-01-15"],
  ["Honda", "Accord", 2019, "Blue", "2023-02-20"],
  ["Ford", "Mustang", 2021, "Black", "2023-03-10"],
  ["Chevrolet", "Malibu", 2018, "Silver", "2023-04-05"],
  ["Nissan", "Altima", 2022, "White", "2023-05-12"],
  ["BMW", "3 Series", 2020, "Gray", "2023-06-18"],
  ["Mercedes-Benz", "C-Class", 2021, "Blue", "2023-07-25"],
  ["Volkswagen", "Jetta", 2019, "Green", "2023-08-30"],
  ["Hyundai", "Elantra", 2023, "Yellow", "2023-09-15"],
  ["Subaru", "Outback", 2018, "Brown", "2023-10-05"]
];

var selection;

function clear() {
  cars = cars.filter((row, r) => selection[r].includes(true))
  .filter((row, r));
 
}
</script>

<h1>Cars</h1>

<button on:click={clear}>Clear</button>

<button on:click={() => cars = [['hello', 'me']]}>New data</button>

<Sheet data={cars} bind:selection/>

