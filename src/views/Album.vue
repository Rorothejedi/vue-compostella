<template>
  <div class="album">
    <div class="container">
      <router-link to="/">Home</router-link> | <br /><br />
      <h2>Album n. {{ $route.params.id }}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto at
        obcaecati suscipit quod aliquid adipisci officiis, fugiat a atque. Unde
        optio itaque dolorum cumque sed odio molestias non nam reprehenderit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magnam
        voluptatum vitae ipsam at magni unde. Dignissimos veniam impedit qui
        dolore magni magnam modi nisi, aperiam libero distinctio dolorum
        temporibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Explicabo nesciunt nisi quae optio quaerat laboriosam labore vel dolorum
        ad, dignissimos ducimus assumenda reiciendis omnis possimus corrupti,
        dolorem, ea voluptatibus at.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
};
</script>
