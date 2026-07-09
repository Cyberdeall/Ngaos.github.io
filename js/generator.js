document
.getElementById("generate")
.addEventListener("click",async()=>{

const username=
document.getElementById("username").value.trim();

const password=
document.getElementById("password").value;

const role=
document.getElementById("role").value;

const active=
document.getElementById("active").checked;

if(username===""){

alert("Username kosong");

return;

}

if(password.length<8){

alert("Password minimal 8 karakter");

return;

}

const hash=
await sha256(password);

const text=`{
id:0,
username:"${username}",
passwordHash:"${hash}",
role:"${role}",
active:${active}
},`;

document.getElementById("output").value=text;

});

document
.getElementById("copy")
.addEventListener("click", async () => {

    const output = document.getElementById("output");

    try {

        if (navigator.clipboard && window.isSecureContext) {

            await navigator.clipboard.writeText(output.value);

        } else {

            output.select();
            document.execCommand("copy");

        }

        alert("Berhasil disalin");

    } catch (err) {

        alert("Gagal menyalin");

        console.error(err);

    }

});
