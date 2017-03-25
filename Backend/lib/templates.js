let templates = {
    restorePassword: function(email, verifyCode) {
        return this.templateBox(this.templateTableBox(`
		<tr>
			<td>
				<h1>Hello ${email},</h1>
			</td>
		</tr>
		<tr>
			<td>
				<p>You have requested to reset your password. Please follow the below link for new password creation. Don't share it with anyone else!</p>
			</td>
		</tr>
		<tr>
			<td>
				<center><p>${this.buttonLink('Reset Password', this.url + 'restore-password/verification-code/' + verifyCode)}</p></center>
			</td>
		</tr>
		<tr>
			<td>${this.templateRegardsBox()}</td>
		</tr>
		<tr>
			<td>${this.templateNoReplyBox()}</td>
		</tr>`));
    },
	verifyemail:function(email,verifyCode){
		return `<div id="verify" style="background:white; max-width: 750px;min-width: 290px;height:342.518px;margin:20;">
   <div id="verify_contain" style="margin:10px;padding:20px;padding-top:48px;">
     <img src="http://dev.bitcointh.com/assets/images/svg/logo.svg">
     <p style="magin-top:43px">Hello ${email}</p>
     <p style="magin-top:26px">Plese click the link below to complete verification :</p>
     <br>
     <a href="${verifyCode}" id="cus_btn" style=" background:#3a7aa5;padding:5px 30px;color:white;border-radius:5px;text-decoration:none;magin-top:17px">Verify my email address</a>
     <br><br>
     <p style="magin-top:46px">Best Regards</p>
     <p style="magin-top:11px">Bitcointh.com</p>
  </div>
</div>`;
	},
	verifySell:function(email,verifyCode){
		return `<div id="verify" style="background:white; max-width: 750px;min-width: 290px;height:342.518px;margin:20;">
   <div id="verify_contain" style="margin:10px;padding:20px;padding-top:48px;">
     <img src="http://dev.bitcointh.com/assets/images/svg/logo.svg">
     <p style="magin-top:43px">Hello ${email}</p>
     <p style="magin-top:26px">Plese click the link below to complete verification :</p>
     <br>
     <a href="${verifyCode}" id="cus_btn" style=" background:#3a7aa5;padding:5px 30px;color:white;border-radius:5px;text-decoration:none;magin-top:17px">Verify Sell confirm</a>
     <br><br>
     <p style="magin-top:46px">Best Regards</p>
     <p style="magin-top:11px">Bitcointh.com</p>
  </div>
</div>`;
	},

    // private function
    mainColor: '#5778BA',
    url: 'http://localhost:4200/',
    buttonLink: function(text, url = "#") {
        return `
		<a href="${url}" target="_blank" style="padding:1em 2em; 
				background: ${this.mainColor}; 
				color: #fff !important; 
				border: 1px solid ${this.mainColor}; 
				font-weight: 400 !important; 
				border-radius: 4px; 
				text-transform: uppercase; 
				text-align: center; 
				text-decoration: none">
			${text}
		</a>
		`
    },
    targetLink: function(text, url = '#') {
        return `<a href="${url}" target="_blank" style="color:${this.mainColor}">${text}</a>`;
    },
    templateBox: function(htmlTemplate) {
        return `
		<!DOCTYPE HTML>
		<div style='font-family: "wf_segoe-ui_normal", "Segoe UI", "Segoe WP", Tahoma, Arial, sans-serif'>
			<center>
				<img src="${this.url}/assets/images/png/logo.png" alt="bitcointh logo image">
			</center>
			<br>
			<center>${htmlTemplate}</center>
			<center>
				<p>
					Copyright © 2016 Bitcointh Ltd.
					${this.targetLink('Terms of use', 'http://dev.bitcointh.com')}
					-
					${this.targetLink('Privacy Policy', 'http://dev.bitcointh.com')}
				</p>
			</center>
		</div>`;
    },
    templateRegardsBox: function() {
        return `
		<p>
			Best Regards,	<br> 
			Bitcointh Team	<br>
			${this.targetLink('www.bitcointh.com', 'http://dev.bitcointh.com')}
		</p>`;
    },
    templateNoReplyBox: function() {
        return `
		<p>
			This email can't recieve replies. For more information, visit the
			${this.targetLink('Bitcointh support center', 'http://dev.bitcointh.com')}
		</p>
		`;
    },
    templateTableBox: function(htmlTemplate) {
        return `<table border="0" cellspacing="0" cellpadding="0" style="border:1px solid #E0E0DF; padding:2em">
					${htmlTemplate}
				</table>`
    }
};

module.exports = templates;