<template>
  <div class="container-fluid m-0 p-0">
    <div id="home-page" class="full-height bg-danger p-4">
        <div class="container pt-3">
            <div class="row pb-5 ">
                <div class="col-lg-6 my-auto pt-4">
                    <div class="text-center mb-3 d-block d-lg-none">
                        <h1 class="display-3 text-light"><strong>{{ title }}</strong></h1>
                        <h3 class="text-light">Ninawapenda Wote!</h3>
                    </div>
                    <img id="iphone-img pt-4 my-auto" src="../assets/iphone.png" class="img-fluig"/>
                </div>

                <div class="col-lg-6 my-auto pt-4">
                    <div class="text-center mb-3 d-none d-lg-block">
                        <h1 class="display-3 text-light"><strong>{{ title }}</strong></h1>
                        <h3 class="text-light">Ninawapenda Wote!</h3>
                    </div>
                    <div class="border p-3 p-m-5 bg-white rounded shadow">
                        <h2>Coming Soon</h2>
                        <form @submit.prevent="addEmail(email)">
                            <div class="form-group">
                                <label for="emailSignup">Reserve your account, we will contact you once it's live</label>
                                <input v-model="email"
                                    id="emailSignup" 
                                    placeholder="Enter email" 
                                    type="text"
                                    class="form-control"
                                >
                                <small id="emailHelp" class="form-text text-muted">We'll never share your personal info</small>
                                <button type="submit" class="btn btn-success">Join Waiting List</button>
                                
                                <div class="mt-4">
                                    <p class="m-0">{{ message }}</p>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="availability" class="p-2">
                        <h4 class="text-center mb-2 mt-3 text-light">
                            Available On
                        </h4>
                        <div class="row">
                            <div class="col my-auto">
                                <img src="../assets/appstore.png" class="float-right img-fluid">
                            </div>
                            <div class="col my-auto">
                                <img src="../assets/playstore.png" class="float-left img-fluid">
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>

    <div id="about" class="bg-light p-3 p-md-5">
        <div class="row">
            <div class="col-lg">
                <!-- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
                <img src="../assets/icons/create.png" height="120" class="m-4">
                <h5 class="ml-md-4 mr-md-4">
                    Create your MaFans creative account!
                </h5>
            </div>
            <div class="col-lg">
                <!-- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
                <img src="../assets/icons/new-post.png" height="120" class="m-4">
                <h5 class="ml-md-4 mr-md-4">
                    Post your original and exclusive content.
                </h5>
            </div>
            <div class="col-lg">
                <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
                <img src="../assets/icons/earn.png" height="120" class="m-4">
                <h5 class="ml-md-4 mr-md-4">
                    Earn from the support of your most loyal fans based on tiers.
                </h5>
            </div>
        </div>
    </div>

    <div id="contact" class="p-4">
        <div class="row justify-content-center mt-3 mb-3">
            <div v-if="showContact" class="col-lg-4">
                <h2>Have any questions?</h2>
                <p>Contact us by filling the information below</p>

                <div v-if="contact_notice != ''" class="alert alert-warning">
                    There was a problem submitting your message. {{ contact_notice }}
                </div>

                <form @submit.prevent="sendContactMessage()">
                    <div class="form-group text-left">
                        <input v-model="contact_email"
                            type="email" id="contactEmail"
                            class="form-control"
                            placeholder="Enter your email"
                        >
                        <textarea v-model="contact_message" 
                            class="form-control mt-3"
                            placeholder="Enter your message"
                            rows="5"
                        ></textarea>
                    </div>
                    <button type="submit" class="btn btn-warning">Send Message</button>
                </form>
            </div>
            
            <div v-else>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us, we will get back to you as soon as possible</p>
            </div>
        </div>
    </div>

    <div id="footer" class=" p-4">
        <footer class="text-light p-4"> 
            <a href="#" class="text-warning">Privacy Policy</a>
            <br>
            <small>&copy; 2021 MaFans.app</small>
        </footer>
    </div>
  </div>
</template>

<script>
import { Auth } from '@/firebase/auth.js'

export default {
  data () {
    return {
        title: "MaFans",
        email: '',
        message: '',
        showContact: true,
        contact_email: '',
        contact_message: '',
        contact_notice: ''
    }
  },
  methods: {
      async addEmail(email) {
          var noticeMessage = "🎊 Your account has been reserved successfully 🎊"
          await Auth.createUserWithEmailAndPassword(email, this.randomPassword(21)).catch((error) => {
              if (error.code != "auth/email-already-in-use")
                noticeMessage = error.message;
          })

          this.message = noticeMessage;
          this.email = '';
      },

      randomPassword(length){
          var chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
          var password = '';

          for (var x = 0; x < length; x++){
              var i = Math.floor(Math.random() * chars.length);
              password += chars.charAt(i);
          }

          return password;
 
      },
      
      sendContactMessage(){
          if (!this.validateEmail(this.contact_email)){
              this.contact_notice = "The email address format is faulty";
          } 
          else if (this.contact_message.length < 10){
              this.contact_notice = "Your message is too short";
          }
          else {
              const url = `https://us-central1-mafans-subscription.cloudfunctions.net/sendEmail?email_from=${this.contact_email}&message=${this.contact_message}`;
              const requestOptions = {
                  methods: "GET",
                  headers: {"Content-Type": "application/json"}
              };

              fetch(url, requestOptions);
              this.showContact = false;
          }

      },

      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #home-page {
        background-color:#FF7F50;
        background:url('../assets/raiyaa.jpeg') no-repeat center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    #iphone-img {
        max-height: 80vh;
    }

    #about {
        min-height: 40vh;
    }

    #contact {
        background-color: #FF6347;
    }

    #footer {
        background-color: #252223;
    }

</style>
