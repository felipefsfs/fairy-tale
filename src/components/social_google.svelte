<script>
  const img_normal = "btn_google_signin_light_normal_web.png";
  const img_focus = "btn_google_signin_light_focus_web.png";
  const img_press = "btn_google_signin_light_pressed_web.png";
  const img_disabled = "btn_google_signin_light_disabled_web.png";

  export let hold = true;
  let google_img = img_normal;
</script>
<div>
    <img alt="Sign in with Google"
        src={(hold && img_disabled) || google_img} on:click
        on:mouseover={() => google_img = img_focus}
        on:mouseout={() => google_img = img_normal}
    />
</div>