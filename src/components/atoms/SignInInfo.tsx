import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Inisialisasi SweetAlert2 dengan React
const MySwal = withReactContent(Swal);

const handleShowLoginInfo = () => {
  MySwal.fire({
    title: "<strong class='text-green-700 text-lg'>Cara Login</strong>",
    html: `
      <div class="text-sm text-gray-700 leading-relaxed">
        Gunakan kredensial berikut untuk mencoba login:
        <div class="mt-3 p-3 bg-green-50 border border-green-100 rounded text-left text-gray-800">
          <p><strong>Email:</strong> sustainnovation@binus.ac.id</p>
          <p><strong>Password:</strong> password</p>
        </div>
      </div>
    `,
    confirmButtonText: "Tutup",
    confirmButtonColor: "#66BB00",
    background: "#f7fff6",
    customClass: {
      popup: "rounded-xl px-4 py-4",
    },
  });
};

export default handleShowLoginInfo;
