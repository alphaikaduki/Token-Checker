function CheckTokens() {
    document.getElementById("results").classList.remove("hide");
    document.getElementById("results").classList.add("results");
    document.getElementById("tokens_list").classList.remove("input_tokens");
    document.getElementById("tokens_list").classList.add("hide");
    var input = document.getElementById("tokens").value.split("\n");
    let tokne_working = [];
    var token_count = input.length;

    input.forEach(token => {
        if (token.length == 59 || token.length == 88) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://discord.com/api/v9/users/@me/outbound-promotions/codes', true);
            xhr.setRequestHeader('Authorization', `${token}`)
            xhr.onload = function () {
                if (xhr.status == 403) {
                    token_count - 1;
                    document.getElementById("invalid_tokens").innerHTML +=
                        `<div class="account">
                        <div class="box">
                            <img src="./asset/Default.png" alt="User Avatar">
                        </div>
                        <div class="box">
                            <span>XXXXX#0000</span>
                            <p>${token}</p>
                        </div>
                    </div>`
                } else {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', 'https://discordapp.com/api/v9/users/@me', true);
                    xhr2.setRequestHeader('Authorization', `${token}`)
                    xhr2.onload = function () {

                        if (xhr.status == 200) {
                            username = xhr2.response.split(`, "username": "`)[1].split(`", "avatar":`)[0] + "#" + xhr2.response.split(`, "discriminator": "`)[1].split(`", "public_flags":`)[0]
                            if (xhr2.response.split(`", "avatar": `)[1].split(`, "discriminator`)[0] == "null") {
                                tokne_working.push(token);
                                token_count - 1;
                                document.getElementById("working_tokens_list").innerHTML +=
                                    `<p>${token}</p>`
                                document.getElementById("valid_tokens").innerHTML +=
                                    `<div class="account">
                                    <div class="box">
                                        <img src="./asset/Default.png" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                            } else {
                                var id = xhr2.response.split(`{"id": "`)[1].split(`", "username": "`)[0];
                                var scd = xhr2.response.split(`", "avatar": "`)[1].split(`", "discriminator`)[0];
                                var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                                tokne_working.push(token);
                                token_count - 1;
                                document.getElementById("working_tokens_list").innerHTML +=
                                    `<p>${token}</p>`
                                document.getElementById("valid_tokens").innerHTML +=
                                    `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                            }
                        }
                        if (xhr.status == 403) {
                            username = xhr2.response.split(`, "username": "`)[1].split(`", "avatar":`)[0] + "#" + xhr2.response.split(`, "discriminator": "`)[1].split(`", "public_flags":`)[0]
                            if (xhr2.response.split(`", "avatar": `)[1].split(`, "discriminator`)[0] == "null") {
                                token_count - 1;
                                document.getElementById("locked_tokens").innerHTML +=
                                    `<div class="account">
                                    <div class="box">
                                        <img src="./asset/Default.png" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                            } else {
                                var id = xhr2.response.split(`{"id": "`)[1].split(`", "username": "`)[0];
                                var scd = xhr2.response.split(`", "avatar": "`)[1].split(`", "discriminator`)[0];
                                var avatar = `https://cdn.discordapp.com/avatars/${id}/${scd}`;
                                token_count - 1;
                                tokne_working.push(token);
                                document.getElementById("working_tokens_list").innerHTML +=
                                    `<p>${token}</p>`
                                document.getElementById("valid_tokens").innerHTML +=
                                    `<div class="account">
                                    <div class="box">
                                        <img src="${avatar}" alt="User Avatar">
                                    </div>
                                    <div class="box">
                                        <span>${username}</span>
                                        <p>${token}</p>
                                    </div>
                                </div>`
                            }
                        }
                    }
                    xhr2.send();
                }

            }
            xhr.send();

        } else {
            document.getElementById("invalid_tokens").innerHTML +=
                `<div class="account">
                   
                    <div class="box">
                        <span>No tokens</span>
                     
                    </div>
                </div>`
        }


    });

}
function download_token(tokne_working2) {
    const blob = new Blob(tokne_working2, { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = 'tokne_working.txt';
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}