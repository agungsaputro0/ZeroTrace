import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Inisialisasi SweetAlert2 dengan React
const MySwal = withReactContent(Swal);

const handleShowLoginInfo = () => {
  MySwal.fire({
    title: "<strong class='text-secondColor text-2xl'>Akun Dummy</strong>",
    html: `
      <div class="text-lg text-gray-700 leading-relaxed">
        <div class="mt-3 -mx-4 p-3 bg-green-50 border border-green-100 rounded text-left text-gray-800">
          <p><strong>Email:</strong> zeroTrace6@binus.ac.id</p>
          <p><strong>Password:</strong> zeroTrace</p>
        </div>
      </div>
    `,
    confirmButtonText: "Tutup",
    confirmButtonColor: "#26C6DA",
    background: "#f7fff6",
    customClass: {
      popup: "rounded-xl px-4 py-4",
    },
  });
};

export default handleShowLoginInfo;
