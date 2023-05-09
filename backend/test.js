// function test() {
//   const response = {
//     data: [
//       {
//         pieceCid:
//           "baga6ea4seaqmr4fps43t73ycg7avcyr6qpqeynhhxce4elb62qrihiemzzoy2ii",
//         fileName: "Screenshot 2023-05-05 095604.png",
//         payloadCid:
//           "bafybeicazlemewyx7tj26jhrgnjsrrnrztn3segwn3zrjr2ngzfqxz33hq",
//         mimeType: "image/png",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683552364018,
//         carSize: 41861,
//         lastUpdate: 1683552364890,
//         fileStatus: "CAR Created",
//         fileSize: 41644,
//         id: "907e1420-8cf7-4fdf-9857-0fe42a6871f2",
//         pieceSize: 65536,
//       },
//       {
//         pieceCid:
//           "baga6ea4seaqofvgmxkvrnwmvf4jcrd7afhvvtdvwppwr3zydrikaynqo5xxpgla",
//         fileName: "digital_painting_a_person_in_streets_of_china_besi.jpeg",
//         payloadCid:
//           "bafybeiclcjo27lt5lm4exnbaac53fstxskmzicn2a5f5n2ido2fxjcfx44",
//         mimeType: "image/jpeg",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683598905065,
//         carSize: 3688043,
//         lastUpdate: 1683598906319,
//         fileStatus: "CAR Created",
//         fileSize: 3687437,
//         id: "400fb466-63d9-4350-b353-d546017654b9",
//         pieceSize: 4194304,
//       },
//       {
//         pieceCid:
//           "baga6ea4seaqofvgmxkvrnwmvf4jcrd7afhvvtdvwppwr3zydrikaynqo5xxpgla",
//         fileName: "digital_painting_a_person_in_streets_of_china_besi.jpeg",
//         payloadCid:
//           "bafybeiclcjo27lt5lm4exnbaac53fstxskmzicn2a5f5n2ido2fxjcfx44",
//         mimeType: "image/jpeg",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683598498484,
//         carSize: 3688043,
//         lastUpdate: 1683598499783,
//         fileStatus: "CAR Created",
//         fileSize: 3687437,
//         id: "9a116f5b-b03b-4959-a684-b6930eb286b4",
//         pieceSize: 4194304,
//       },
//       {
//         pieceCid:
//           "baga6ea4seaqj5x6oc5hrusyperukhtj3yn4l5rrb3zfcl63icgy3tw2qfrbiuey",
//         fileName: "Screenshot 2023-05-04 150643.png",
//         payloadCid:
//           "bafybeif2sxvnp6vxv2tzw7yv4cb6o5xnijw4obmq34um5kcs5rnw3ptvge",
//         mimeType: "image/png",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683193277940,
//         carSize: 22652,
//         lastUpdate: 1683193278801,
//         fileStatus: "CAR Created",
//         fileSize: 22435,
//         id: "097703ad-2256-4013-99ad-a2a3642ea4dc",
//         pieceSize: 32768,
//       },
//       {
//         pieceCid:
//           "baga6ea4seaqofvgmxkvrnwmvf4jcrd7afhvvtdvwppwr3zydrikaynqo5xxpgla",
//         fileName: "digital_painting_a_person_in_streets_of_china_besi.jpeg",
//         payloadCid:
//           "bafybeiclcjo27lt5lm4exnbaac53fstxskmzicn2a5f5n2ido2fxjcfx44",
//         mimeType: "image/jpeg",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683597887405,
//         carSize: 3688043,
//         lastUpdate: 1683597888840,
//         fileStatus: "CAR Created",
//         fileSize: 3687437,
//         id: "705178cc-a3f6-456f-adb8-24e3943bf013",
//         pieceSize: 4194304,
//       },
//       {
//         pieceCid: "",
//         fileName: "Screenshot (101).png",
//         payloadCid: "",
//         mimeType: "image/png",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683552540367,
//         carSize: 0,
//         lastUpdate: 1683552540367,
//         fileStatus: "Creating CAR",
//         fileSize: 2799712,
//         id: "82044ce8-9bd2-4e16-8375-f6f9bfe6efc2",
//         pieceSize: 0,
//       },
//       {
//         pieceCid:
//           "baga6ea4seaqofvgmxkvrnwmvf4jcrd7afhvvtdvwppwr3zydrikaynqo5xxpgla",
//         fileName: "digital_painting_a_person_in_streets_of_china_besi.jpeg",
//         payloadCid:
//           "bafybeiclcjo27lt5lm4exnbaac53fstxskmzicn2a5f5n2ido2fxjcfx44",
//         mimeType: "image/jpeg",
//         userName: "0x9299eac94952235ae86b94122d2f7c77f7f6ad30",
//         createdAt: 1683599134409,
//         carSize: 3688043,
//         lastUpdate: 1683599135665,
//         fileStatus: "CAR Created",
//         fileSize: 3687437,
//         id: "35097720-4830-4d67-8463-8e85284e88ac",
//         pieceSize: 4194304,
//       },
//     ],
//   };
//   // console.log(response.data[0]);
//   const result = response.data.filter((item) => {
//     return (
//       item.fileName ===
//       "digital_painting_a_person_in_streets_of_china_besi.jpeg"
//     );
//   });
//   console.log(result);
// }
// test();
function convertDateToSeconds(dateValue) {
  // Create a new Date object from the date input value
  const date = new Date(dateValue);

  // Get the time value in milliseconds
  const timeInMilliseconds = date.getTime();
  console.log(timeInMilliseconds);
  // Convert milliseconds to seconds
  const timeInSeconds = Math.floor(timeInMilliseconds / 1000);

  return timeInSeconds;
}

// Example usage:
const dateValue = "2023-05-09"; // Replace with the actual date input value
const seconds = convertDateToSeconds(dateValue);

console.log(seconds);
