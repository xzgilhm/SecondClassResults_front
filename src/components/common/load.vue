<style  scoped>

  .demo-spin-col{
    height: 100px;
    position: relative;
    }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
 
</style>

<template>
 <div>
    <Row>
        <Col class="demo-spin-col" span="24">
            <Spin fix>
                <Icon type="load-c" size=28 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </Row>
  </div>
</template>